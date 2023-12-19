// Copyright (c) 2023, NeKz
// SPDX-License-Identifier: MIT

import * as XML from 'xml/mod.ts';
import { Base64, deserialize, Double, Integer, serialize } from './xml.ts';

// deno-lint-ignore-file ban-types

export type RpcMethod<P = keyof Remote> = P extends string
    ? P extends Capitalize<P> ? P : P extends `system.${string}` ? P
    : never
    : never;

export type RpcMethodResponse = {
    params: {
        param: {
            // deno-lint-ignore no-explicit-any
            value: any;
        };
    };
};

export type RpcFaultResponse = {
    fault: {
        value: {
            struct: {
                member: [
                    { name: 'faultCode'; value: { int: string } },
                    { name: 'faultString'; value: { string: string } },
                ];
            };
        };
    };
};

export type RpcResponse = {
    methodResponse: RpcMethodResponse | RpcFaultResponse;
};

export type MultiCall = {
    // deno-lint-ignore no-explicit-any
    [key in RpcMethod]: Remote[key] extends (...args: any) => any
        ? (...params: Parameters<Remote[key]>) => ReturnType<Remote[key]> extends Promise<infer T> ? T : never
        : never;
};

const encoder = new TextEncoder();
const decoder = new TextDecoder();

export class Remote {
    #connection: Deno.Conn | null = null;

    /**
     * Construct a new GBX remote object.
     * ```ts
     * using remote = new Remote('127.0.0.1', 5_000);
     * await remote.connect();
     * await remote.Authenticate(name, password);
     * ```
     */
    constructor(public readonly hostname: string, public readonly port: number) {}
    async connect() {
        this.#connection = await Deno.connect({
            hostname: this.hostname,
            port: this.port,
        });

        const length = new Uint8Array(4);
        await this.#connection.read(length);

        const view = new DataView(length.buffer);
        const header = new Uint8Array(view.getUint32(0, true));
        await this.#connection.read(header);

        const protocol = decoder.decode(header);
        if (protocol !== 'GBXRemote 2') {
            throw new Error('Invalid header value. Expected "GBXRemote 2" protocol.');
        }
    }
    close() {
        this.#connection?.close();
        this.#connection = null;
    }
    [Symbol.dispose]() {
        this.close();
    }
    protected async call<T>(methodName: RpcMethod, ...params: unknown[]) {
        if (!this.#connection) {
            throw new Error('Not connected!');
        }

        const xmlParams = params.map((param) => {
            const xml = serialize(param);
            return xml !== undefined ? `<param><value>${xml}</value></param>` : '';
        });

        const xml = `<?xml version="1.0"?><methodCall><methodName>${methodName}</methodName><params>${
            xmlParams.join('')
        }</params></methodCall>`;

        {
            const payload = encoder.encode(xml);
            const buffer = new Uint8Array(8 + payload.byteLength);
            const view = new DataView(buffer.buffer);
            const handle = 0x80000000 + 1;
            view.setUint32(0, payload.byteLength, true);
            view.setUint32(4, handle, true);
            buffer.set(payload, 8);

            const writer = this.#connection.writable.getWriter();
            await writer.write(buffer);
            writer.releaseLock();
        }

        {
            const buffer = new Uint8Array(8);
            await this.#connection.read(buffer);

            const dv = new DataView(buffer.buffer);
            const length = dv.getUint32(0, true);
            const _handle = dv.getUint32(4, true);
            const payload = new Uint8Array(length);
            await this.#connection.read(payload);

            const response = decoder.decode(payload);
            const doc = XML.parse(response, {
                emptyToNull: false,
                reviveNumbers: false,
                reviveBooleans: false,
                reviver(options) {
                    if (options.tag === 'boolean' && options.value?.toString()?.length) {
                        return options.value === '1' ? true : false;
                    }
                    return options.value;
                },
                // deno-lint-ignore no-explicit-any
            }) as any as RpcResponse;

            if ('fault' in doc.methodResponse) {
                throw new Error('XML-RPC fault.', { cause: doc.methodResponse.fault });
            }

            const result = Object.values(doc.methodResponse.params.param.value).at(0);
            return deserialize<T>(result);
        }
    }
    /**
     * Call multiple methods at once.
     * ```ts
     * const [dataDirectory, chatLines] = await remote.multiCall((call) => [
     *     call.GameDataDirectory(),
     *     call.GetChatLines(),
     * ]);
     * ```
     */
    async multiCall<T extends unknown[]>(
        func: (remote: MultiCall) => [...T],
    ) {
        const queue: unknown[] = [];

        const proxyCall = (methodName: string, ...params: unknown[]) => {
            queue.push({ methodName, params });
        };

        const proxy = new Proxy(this as MultiCall, {
            get(target, p) {
                if (p === 'call') {
                    return proxyCall;
                }
                return target[p as keyof MultiCall];
            },
        });

        const res = func(proxy);

        return await this.call('system.multicall', queue) as typeof res ?? [];
    }
    /**
     * Return an array of all available XML-RPC methods on this server.
     */
    'system.listMethods'() {
        return this.call<string[]>('system.listMethods');
    }
    /**
     * Given the name of a method, return an array of legal signatures. Each signature is an array of strings. The
     * first item of each signature is the return type, and any others items are parameter types.
     */
    'system.methodSignature'(methodName: string) {
        return this.call<string[][]>('system.methodSignature', methodName);
    }
    /**
     * Given the name of a method, return a help string.
     */
    'system.methodHelp'(methodName: string) {
        return this.call<string>('system.methodHelp', methodName);
    }
    /**
     * Process an array of calls, and return an array of results. Calls should be structs of the form {'methodName':
     * string, 'params': array}. Each result will either be a single-item array containing the result value, or a
     * struct of the form {'faultCode': int, 'faultString': string}. This is useful when you need to make lots of small
     * calls without lots of round trips.
     */
    'system.multicall'(a1: system_multicall_t[]) {
        return this.call<system_multicall_t[]>('system.multicall', a1);
    }
    /**
     * Allow user authentication by specifying a login and a password, to gain access to the set of functionalities
     * corresponding to this authorization level.
     */
    Authenticate(a1: string, a2: string) {
        return this.call<boolean>('Authenticate', a1, a2);
    }
    /**
     * Change the password for the specified login/user.
     */
    ChangeAuthPassword(a1: string, a2: string) {
        return this.call<boolean>('ChangeAuthPassword', a1, a2);
    }
    /**
     * Allow the GameServer to call you back.
     */
    EnableCallbacks(a1: boolean) {
        return this.call<boolean>('EnableCallbacks', a1);
    }
    /**
     * Define the wanted api.
     */
    SetApiVersion(a1: string) {
        return this.call<boolean>('SetApiVersion', a1);
    }
    /**
     * Returns a struct with the Name, TitleId, Version, Build and ApiVersion of the application remotely controlled.
     */
    GetVersion() {
        return this.call<GetVersion_t>('GetVersion');
    }
    /**
     * Returns the current status of the server.
     */
    GetStatus() {
        return this.call<GetStatus_t>('GetStatus');
    }
    /**
     * Quit the application.
     */
    QuitGame() {
        return this.call<boolean>('QuitGame');
    }
    /**
     * Call a vote for a cmd. The command is a XML string corresponding to an XmlRpc request.
     */
    CallVote(a1: string) {
        return this.call<boolean>('CallVote', a1);
    }
    /**
     * Extended call vote. Same as CallVote, but you can additionally supply specific parameters for this vote: a
     * ratio, a time out and who is voting. Special timeout values: a ratio of '-1' means default; a timeout of '0'
     * means default, '1' means indefinite; Voters values: '0' means only active players, '1' means any player, '2' is
     * for everybody, pure spectators included.
     */
    CallVoteEx(a1: string, a2: number, a3: number, a4: number) {
        return this.call<boolean>('CallVoteEx', a1, Double.from(a2), Integer.from(a3), Integer.from(a4));
    }
    /**
     * Used internally by game.
     */
    InternalCallVote() {
        return this.call<boolean>('InternalCallVote');
    }
    /**
     * Cancel the current vote.
     */
    CancelVote() {
        return this.call<boolean>('CancelVote');
    }
    /**
     * Returns the vote currently in progress. The returned structure is { CallerLogin, CmdName, CmdParam }.
     */
    GetCurrentCallVote() {
        return this.call<GetCurrentCallVote_t>('GetCurrentCallVote');
    }
    /**
     * Set a new timeout for waiting for votes. A zero value disables callvote. Requires a map restart to be taken
     * into account.
     */
    SetCallVoteTimeOut(a1: number) {
        return this.call<boolean>('SetCallVoteTimeOut', Integer.from(a1));
    }
    /**
     * Get the current and next timeout for waiting for votes. The struct returned contains two fields 'CurrentValue'
     * and 'NextValue'.
     */
    GetCallVoteTimeOut() {
        return this.call<GetCallVoteTimeOut_t>('GetCallVoteTimeOut');
    }
    /**
     * Set a new default ratio for passing a vote. Must lie between 0 and 1.
     */
    SetCallVoteRatio(a1: number) {
        return this.call<boolean>('SetCallVoteRatio', Double.from(a1));
    }
    /**
     * Get the current default ratio for passing a vote. This value lies between 0 and 1.
     */
    GetCallVoteRatio() {
        return this.call<number>('GetCallVoteRatio');
    }
    /**
     * Set the ratios list for passing specific votes. The parameter is an array of structs {string Command, double
     * Ratio}, ratio is in [0,1] or -1 for vote disabled.
     */
    SetCallVoteRatios(a1: SetCallVoteRatios_t[]) {
        return this.call<boolean>('SetCallVoteRatios', a1);
    }
    /**
     * Get the current ratios for passing votes.
     */
    GetCallVoteRatios() {
        return this.call<GetCallVoteRatios_t[]>('GetCallVoteRatios');
    }
    /**
     * Set the ratios list for passing specific votes, extended version with parameters matching. The parameters, a
     * boolean ReplaceAll (or else, only modify specified ratios, leaving the previous ones unmodified) and an array of
     * structs {string Command, string Param, double Ratio}, ratio is in [0,1] or -1 for vote disabled. Param is
     * matched against the vote parameters to make more specific ratios, leave empty to match all votes for the
     * command.
     */
    SetCallVoteRatiosEx(a1: boolean, a2: SetCallVoteRatiosEx_t[]) {
        return this.call<boolean>('SetCallVoteRatiosEx', a1, a2);
    }
    /**
     * Get the current ratios for passing votes, extended version with parameters matching.
     */
    GetCallVoteRatiosEx() {
        return this.call<GetCallVoteRatiosEx_t[]>('GetCallVoteRatiosEx');
    }
    /**
     * Send a text message to all clients without the server login.
     */
    ChatSendServerMessage(a1: string) {
        return this.call<boolean>('ChatSendServerMessage', a1);
    }
    /**
     * Send a localised text message to all clients without the server login, or optionally to a Login (which can be a
     * single login or a list of comma-separated logins). The parameter is an array of structures {Lang='xx',
     * Text='...'}. If no matching language is found, the last text in the array is used.
     */
    ChatSendServerMessageToLanguage(a1: ChatSendServerMessageToLanguage_t[], a2: string) {
        return this.call<boolean>('ChatSendServerMessageToLanguage', a1, a2);
    }
    /**
     * Send a text message without the server login to the client with the specified PlayerId.
     */
    ChatSendServerMessageToId(a1: string, a2: number) {
        return this.call<boolean>('ChatSendServerMessageToId', a1, Integer.from(a2));
    }
    /**
     * Send a text message without the server login to the client with the specified login. Login can be a single
     * login or a list of comma-separated logins.
     */
    ChatSendServerMessageToLogin(a1: string, a2: string) {
        return this.call<boolean>('ChatSendServerMessageToLogin', a1, a2);
    }
    /**
     * Send a text message to all clients.
     */
    ChatSend(a1: string) {
        return this.call<boolean>('ChatSend', a1);
    }
    /**
     * Send a localised text message to all clients, or optionally to a Login (which can be a single login or a list
     * of comma-separated logins). The parameter is an array of structures {Lang='xx', Text='...'}. If no matching
     * language is found, the last text in the array is used.
     */
    ChatSendToLanguage(a1: ChatSendToLanguage_t[], a2: string) {
        return this.call<boolean>('ChatSendToLanguage', a1, a2);
    }
    /**
     * Send a text message to the client with the specified login. Login can be a single login or a list of
     * comma-separated logins.
     */
    ChatSendToLogin(a1: string, a2: string) {
        return this.call<boolean>('ChatSendToLogin', a1, a2);
    }
    /**
     * Send a text message to the client with the specified PlayerId.
     */
    ChatSendToId(a1: string, a2: number) {
        return this.call<boolean>('ChatSendToId', a1, Integer.from(a2));
    }
    /**
     * Returns the last chat lines. Maximum of 40 lines.
     */
    GetChatLines() {
        return this.call<GetChatLines_t[]>('GetChatLines');
    }
    /**
     * The chat messages are no longer dispatched to the players, they only go to the rpc callback and the controller
     * has to manually forward them. The second (optional) parameter allows all messages from the server to be
     * automatically forwarded.
     */
    ChatEnableManualRouting(a1: boolean, a2: boolean) {
        return this.call<boolean>('ChatEnableManualRouting', a1, a2);
    }
    /**
     * (Text, SenderLogin, DestLogin) Send a text message to the specified DestLogin (or everybody if empty) on behalf
     * of SenderLogin. DestLogin can be a single login or a list of comma-separated logins. Only available if manual
     * routing is enabled.
     */
    ChatForwardToLogin(a1: string, a2: string, a3: string) {
        return this.call<boolean>('ChatForwardToLogin', a1, a2, a3);
    }
    /**
     * Display a notice on all clients. The parameters are the text message to display, and the login of the avatar to
     * display next to it (or '' for no avatar), and an optional 'variant' in [0 = normal, 1 = Sad, 2 = Happy].
     */
    SendNotice(a1: string, a2: string, a3: number) {
        return this.call<boolean>('SendNotice', a1, a2, Integer.from(a3));
    }
    /**
     * Display a notice on the client with the specified UId. The parameters are the Uid of the client to whom the
     * notice is sent, the text message to display, and the UId of the avatar to display next to it (or '255' for no
     * avatar), and an optional 'variant' in [0 = normal, 1 = Sad, 2 = Happy].
     */
    SendNoticeToId(a1: number, a2: string, a3: number, a4: number) {
        return this.call<boolean>('SendNoticeToId', Integer.from(a1), a2, Integer.from(a3), Integer.from(a4));
    }
    /**
     * Display a notice on the client with the specified login. The parameters are the login of the client to whom the
     * notice is sent, the text message to display, and the login of the avatar to display next to it (or '' for no
     * avatar), and an optional 'variant' in [0 = normal, 1 = Sad, 2 = Happy]. Login can be a single login or a list of
     * comma-separated logins.
     */
    SendNoticeToLogin(a1: string, a2: string, a3: string, a4: number) {
        return this.call<boolean>('SendNoticeToLogin', a1, a2, a3, Integer.from(a4));
    }
    /**
     * Display a manialink page on all clients. The parameters are the xml description of the page to display, a
     * timeout to autohide it (0 = permanent), and a boolean to indicate whether the page must be hidden as soon as the
     * user clicks on a page option.
     */
    SendDisplayManialinkPage(a1: string, a2: number, a3: boolean) {
        return this.call<boolean>('SendDisplayManialinkPage', a1, Integer.from(a2), a3);
    }
    /**
     * Display a manialink page on the client with the specified UId. The first parameter is the UId of the player,
     * the other are identical to 'SendDisplayManialinkPage'.
     */
    SendDisplayManialinkPageToId(a1: number, a2: string, a3: number, a4: boolean) {
        return this.call<boolean>('SendDisplayManialinkPageToId', Integer.from(a1), a2, Integer.from(a3), a4);
    }
    /**
     * Display a manialink page on the client with the specified login. The first parameter is the login of the
     * player, the other are identical to 'SendDisplayManialinkPage'. Login can be a single login or a list of
     * comma-separated logins.
     */
    SendDisplayManialinkPageToLogin(a1: string, a2: string, a3: number, a4: boolean) {
        return this.call<boolean>('SendDisplayManialinkPageToLogin', a1, a2, Integer.from(a3), a4);
    }
    /**
     * Hide the displayed manialink page on all clients.
     */
    SendHideManialinkPage() {
        return this.call<boolean>('SendHideManialinkPage');
    }
    /**
     * Hide the displayed manialink page on the client with the specified UId.
     */
    SendHideManialinkPageToId(a1: number) {
        return this.call<boolean>('SendHideManialinkPageToId', Integer.from(a1));
    }
    /**
     * Hide the displayed manialink page on the client with the specified login. Login can be a single login or a list
     * of comma-separated logins.
     */
    SendHideManialinkPageToLogin(a1: string) {
        return this.call<boolean>('SendHideManialinkPageToLogin', a1);
    }
    /**
     * Returns the latest results from the current manialink page, as an array of structs {string Login, int PlayerId,
     * int Result} Result==0 -> no answer, Result>0.... -> answer from the player.
     */
    GetManialinkPageAnswers() {
        return this.call<GetManialinkPageAnswers_t[]>('GetManialinkPageAnswers');
    }
    /**
     * Opens a link in the client with the specified UId. The parameters are the Uid of the client to whom the link to
     * open is sent, the link url, and the 'LinkType' (0 in the external browser, 1 in the internal manialink browser).
     */
    SendOpenLinkToId(a1: number, a2: string, a3: number) {
        return this.call<boolean>('SendOpenLinkToId', Integer.from(a1), a2, Integer.from(a3));
    }
    /**
     * Opens a link in the client with the specified login. The parameters are the login of the client to whom the
     * link to open is sent, the link url, and the 'LinkType' (0 in the external browser, 1 in the internal manialink
     * browser). Login can be a single login or a list of comma-separated logins.
     */
    SendOpenLinkToLogin(a1: string, a2: string, a3: number) {
        return this.call<boolean>('SendOpenLinkToLogin', a1, a2, Integer.from(a3));
    }
    /**
     * Kick the player with the specified login, with an optional message.
     */
    Kick(a1: string, a2: string) {
        return this.call<boolean>('Kick', a1, a2);
    }
    /**
     * Kick the player with the specified PlayerId, with an optional message.
     */
    KickId(a1: number, a2: string) {
        return this.call<boolean>('KickId', Integer.from(a1), a2);
    }
    /**
     * Ban the player with the specified login, with an optional message.
     */
    Ban(a1: string, a2: string) {
        return this.call<boolean>('Ban', a1, a2);
    }
    /**
     * Ban the player with the specified login, with a message. Add it to the black list, and optionally save the new
     * list.
     */
    BanAndBlackList(a1: string, a2: string, a3: boolean) {
        return this.call<boolean>('BanAndBlackList', a1, a2, a3);
    }
    /**
     * Ban the player with the specified PlayerId, with an optional message.
     */
    BanId(a1: number, a2: string) {
        return this.call<boolean>('BanId', Integer.from(a1), a2);
    }
    /**
     * Unban the player with the specified login.
     */
    UnBan(a1: string) {
        return this.call<boolean>('UnBan', a1);
    }
    /**
     * Clean the ban list of the server.
     */
    CleanBanList() {
        return this.call<boolean>('CleanBanList');
    }
    /**
     * Returns the list of banned players. This method takes two parameters. The first parameter specifies the maximum
     * number of infos to be returned, and the second one the starting index in the list. The list is an array of
     * structures. Each structure contains the following fields : Login, ClientName and IPAddress.
     */
    GetBanList(a1: number, a2: number) {
        return this.call<GetBanList_t[]>('GetBanList', Integer.from(a1), Integer.from(a2));
    }
    /**
     * Blacklist the player with the specified login.
     */
    BlackList(a1: string) {
        return this.call<boolean>('BlackList', a1);
    }
    /**
     * Blacklist the player with the specified PlayerId.
     */
    BlackListId(a1: number) {
        return this.call<boolean>('BlackListId', Integer.from(a1));
    }
    /**
     * UnBlackList the player with the specified login.
     */
    UnBlackList(a1: string) {
        return this.call<boolean>('UnBlackList', a1);
    }
    /**
     * Clean the blacklist of the server.
     */
    CleanBlackList() {
        return this.call<boolean>('CleanBlackList');
    }
    /**
     * Returns the list of blacklisted players. This method takes two parameters. The first parameter specifies the
     * maximum number of infos to be returned, and the second one the starting index in the list. The list is an array
     * of structures. Each structure contains the following fields : Login.
     */
    GetBlackList(a1: number, a2: number) {
        return this.call<GetBlackList_t[]>('GetBlackList', Integer.from(a1), Integer.from(a2));
    }
    /**
     * Load the black list file with the specified file name.
     */
    LoadBlackList(a1: string) {
        return this.call<boolean>('LoadBlackList', a1);
    }
    /**
     * Save the black list in the file with specified file name.
     */
    SaveBlackList(a1: string) {
        return this.call<boolean>('SaveBlackList', a1);
    }
    /**
     * Add the player with the specified login on the guest list.
     */
    AddGuest(a1: string) {
        return this.call<boolean>('AddGuest', a1);
    }
    /**
     * Add the player with the specified PlayerId on the guest list.
     */
    AddGuestId(a1: number) {
        return this.call<boolean>('AddGuestId', Integer.from(a1));
    }
    /**
     * Remove the player with the specified login from the guest list.
     */
    RemoveGuest(a1: string) {
        return this.call<boolean>('RemoveGuest', a1);
    }
    /**
     * Remove the player with the specified PlayerId from the guest list.
     */
    RemoveGuestId(a1: number) {
        return this.call<boolean>('RemoveGuestId', Integer.from(a1));
    }
    /**
     * Clean the guest list of the server.
     */
    CleanGuestList() {
        return this.call<boolean>('CleanGuestList');
    }
    /**
     * Returns the list of players on the guest list. This method takes two parameters. The first parameter specifies
     * the maximum number of infos to be returned, and the second one the starting index in the list. The list is an
     * array of structures. Each structure contains the following fields : Login.
     */
    GetGuestList(a1: number, a2: number) {
        return this.call<GetGuestList_t[]>('GetGuestList', Integer.from(a1), Integer.from(a2));
    }
    /**
     * Load the guest list file with the specified file name.
     */
    LoadGuestList(a1: string) {
        return this.call<boolean>('LoadGuestList', a1);
    }
    /**
     * Save the guest list in the file with specified file name.
     */
    SaveGuestList(a1: string) {
        return this.call<boolean>('SaveGuestList', a1);
    }
    /**
     * Sets whether buddy notifications should be sent in the chat. login is the login of the player, or '' for global
     * setting, and enabled is the value.
     */
    SetBuddyNotification(a1: string, a2: boolean) {
        return this.call<boolean>('SetBuddyNotification', a1, a2);
    }
    /**
     * Gets whether buddy notifications are enabled for login, or '' to get the global setting.
     */
    GetBuddyNotification(a1: string) {
        return this.call<boolean>('GetBuddyNotification', a1);
    }
    /**
     * Write the data to the specified file. The filename is relative to the Maps path.
     */
    WriteFile(a1: string, a2: string) {
        return this.call<boolean>('WriteFile', a1, Base64.from(a2));
    }
    /**
     * Send the data to the specified player.
     */
    TunnelSendDataToId(a1: number, a2: string) {
        return this.call<boolean>('TunnelSendDataToId', Integer.from(a1), Base64.from(a2));
    }
    /**
     * Send the data to the specified player. Login can be a single login or a list of comma-separated logins.
     */
    TunnelSendDataToLogin(a1: string, a2: string) {
        return this.call<boolean>('TunnelSendDataToLogin', a1, Base64.from(a2));
    }
    /**
     * Just log the parameters and invoke a callback. Can be used to talk to other xmlrpc clients connected, or to
     * make custom votes. If used in a callvote, the first parameter will be used as the vote message on the clients.
     */
    Echo(a1: string, a2: string) {
        return this.call<boolean>('Echo', a1, a2);
    }
    /**
     * Ignore the player with the specified login.
     */
    Ignore(a1: string) {
        return this.call<boolean>('Ignore', a1);
    }
    /**
     * Ignore the player with the specified PlayerId.
     */
    IgnoreId(a1: number) {
        return this.call<boolean>('IgnoreId', Integer.from(a1));
    }
    /**
     * Unignore the player with the specified login.
     */
    UnIgnore(a1: string) {
        return this.call<boolean>('UnIgnore', a1);
    }
    /**
     * Unignore the player with the specified PlayerId.
     */
    UnIgnoreId(a1: number) {
        return this.call<boolean>('UnIgnoreId', Integer.from(a1));
    }
    /**
     * Clean the ignore list of the server.
     */
    CleanIgnoreList() {
        return this.call<boolean>('CleanIgnoreList');
    }
    /**
     * Returns the list of ignored players. This method takes two parameters. The first parameter specifies the
     * maximum number of infos to be returned, and the second one the starting index in the list. The list is an array
     * of structures. Each structure contains the following fields : Login.
     */
    GetIgnoreList(a1: number, a2: number) {
        return this.call<GetIgnoreList_t[]>('GetIgnoreList', Integer.from(a1), Integer.from(a2));
    }
    /**
     * Pay planets from the server account to a player, returns the BillId. This method takes three parameters: Login
     * of the payee, Cost in planets to pay and a Label to send with the payment. The creation of the transaction
     * itself may cost planets, so you need to have planets on the server account.
     */
    Pay(a1: string, a2: number, a3: string) {
        return this.call<number>('Pay', a1, Integer.from(a2), a3);
    }
    /**
     * Create a bill, send it to a player, and return the BillId. This method takes four parameters: LoginFrom of the
     * payer, Cost in planets the player has to pay, Label of the transaction and an optional LoginTo of the payee (if
     * empty string, then the server account is used). The creation of the transaction itself may cost planets, so you
     * need to have planets on the server account.
     */
    SendBill(a1: string, a2: number, a3: string, a4: string) {
        return this.call<number>('SendBill', a1, Integer.from(a2), a3, a4);
    }
    /**
     * Returns the current state of a bill. This method takes one parameter, the BillId. Returns a struct containing
     * State, StateName and TransactionId. Possible enum values are: CreatingTransaction, Issued, ValidatingPayement,
     * Payed, Refused, Error.
     */
    GetBillState(a1: number) {
        return this.call<GetBillState_t>('GetBillState', Integer.from(a1));
    }
    /**
     * Returns the current number of planets on the server account.
     */
    GetServerPlanets() {
        return this.call<number>('GetServerPlanets');
    }
    /**
     * (deprecated)
     * @deprecated
     */
    GetServerCoppers() {
        return this.call<number>('GetServerCoppers');
    }
    /**
     * Get some system infos, including connection rates (in kbps).
     */
    GetSystemInfo() {
        return this.call<GetSystemInfo_t>('GetSystemInfo');
    }
    /**
     * Set the download and upload rates (in kbps).
     */
    SetConnectionRates(a1: number, a2: number) {
        return this.call<boolean>('SetConnectionRates', Integer.from(a1), Integer.from(a2));
    }
    /**
     * Returns the list of tags and associated values set on this server.
     */
    GetServerTags() {
        return this.call<GetServerTags_t[]>('GetServerTags');
    }
    /**
     * Set a tag and its value on the server. This method takes two parameters. The first parameter specifies the name
     * of the tag, and the second one its value. The list is an array of structures {string Name, string Value}.
     */
    SetServerTag(a1: string, a2: string) {
        return this.call<boolean>('SetServerTag', a1, a2);
    }
    /**
     * Unset the tag with the specified name on the server.
     */
    UnsetServerTag(a1: string) {
        return this.call<boolean>('UnsetServerTag', a1);
    }
    /**
     * Reset all tags on the server.
     */
    ResetServerTags() {
        return this.call<boolean>('ResetServerTags');
    }
    /**
     * Set a new server name in utf8 format.
     */
    SetServerName(a1: string) {
        return this.call<boolean>('SetServerName', a1);
    }
    /**
     * Get the server name in utf8 format.
     */
    GetServerName() {
        return this.call<string>('GetServerName');
    }
    /**
     * Set a new server comment in utf8 format.
     */
    SetServerComment(a1: string) {
        return this.call<boolean>('SetServerComment', a1);
    }
    /**
     * Get the server comment in utf8 format.
     */
    GetServerComment() {
        return this.call<string>('GetServerComment');
    }
    /**
     * Set whether the server should be hidden from the public server list (0 = visible, 1 = always hidden, 2 = hidden
     * from nations).
     */
    SetHideServer(a1: number) {
        return this.call<boolean>('SetHideServer', Integer.from(a1));
    }
    /**
     * Get whether the server wants to be hidden from the public server list.
     */
    GetHideServer() {
        return this.call<number>('GetHideServer');
    }
    /**
     * Set a new password for the server.
     */
    SetServerPassword(a1: string) {
        return this.call<boolean>('SetServerPassword', a1);
    }
    /**
     * Get the server password if called as Admin or Super Admin, else returns if a password is needed or not.
     */
    GetServerPassword() {
        return this.call<string>('GetServerPassword');
    }
    /**
     * Set a new password for the spectator mode.
     */
    SetServerPasswordForSpectator(a1: string) {
        return this.call<boolean>('SetServerPasswordForSpectator', a1);
    }
    /**
     * Get the password for spectator mode if called as Admin or Super Admin, else returns if a password is needed or
     * not.
     */
    GetServerPasswordForSpectator() {
        return this.call<string>('GetServerPasswordForSpectator');
    }
    /**
     * Set a new maximum number of players. Requires a map restart to be taken into account.
     */
    SetMaxPlayers(a1: number) {
        return this.call<boolean>('SetMaxPlayers', Integer.from(a1));
    }
    /**
     * Get the current and next maximum number of players allowed on server. The struct returned contains two fields
     * CurrentValue and NextValue.
     */
    GetMaxPlayers() {
        return this.call<GetMaxPlayers_t>('GetMaxPlayers');
    }
    /**
     * Set a new maximum number of Spectators. Requires a map restart to be taken into account.
     */
    SetMaxSpectators(a1: number) {
        return this.call<boolean>('SetMaxSpectators', Integer.from(a1));
    }
    /**
     * Get the current and next maximum number of Spectators allowed on server. The struct returned contains two
     * fields CurrentValue and NextValue.
     */
    GetMaxSpectators() {
        return this.call<GetMaxSpectators_t>('GetMaxSpectators');
    }
    /**
     * Declare if the server is a lobby, the number and maximum number of players currently managed by it, and the
     * average level of the players.
     */
    SetLobbyInfo(a1: boolean, a2: number, a3: number, a4: number) {
        return this.call<boolean>('SetLobbyInfo', a1, Integer.from(a2), Integer.from(a3), Double.from(a4));
    }
    /**
     * Get whether the server if a lobby, the number and maximum number of players currently managed by it. The struct
     * returned contains 4 fields IsLobby, LobbyPlayers, LobbyMaxPlayers, and LobbyPlayersLevel.
     */
    GetLobbyInfo() {
        return this.call<GetLobbyInfo_t>('GetLobbyInfo');
    }
    /**
     * Customize the clients 'leave server' dialog box. Parameters are: ManialinkPage, SendToServer url
     * '#qjoin=login@title', ProposeAddToFavorites and DelayQuitButton (in milliseconds).
     */
    CustomizeQuitDialog(a1: string, a2: string, a3: boolean, a4: number) {
        return this.call<boolean>('CustomizeQuitDialog', a1, a2, a3, Integer.from(a4));
    }
    /**
     * Prior to loading next map, execute SendToServer url '#qjoin=login@title'.
     */
    SendToServerAfterMatchEnd(a1: string) {
        return this.call<boolean>('SendToServerAfterMatchEnd', a1);
    }
    /**
     * Set whether, when a player is switching to spectator, the server should still consider him a player and keep
     * his player slot, or not.
     */
    KeepPlayerSlots(a1: boolean) {
        return this.call<boolean>('KeepPlayerSlots', a1);
    }
    /**
     * Get whether the server keeps player slots when switching to spectator.
     */
    IsKeepingPlayerSlots() {
        return this.call<boolean>('IsKeepingPlayerSlots');
    }
    /**
     * Allow clients to download maps from the server.
     */
    AllowMapDownload(a1: boolean) {
        return this.call<boolean>('AllowMapDownload', a1);
    }
    /**
     * Returns if clients can download maps from the server.
     */
    IsMapDownloadAllowed() {
        return this.call<boolean>('IsMapDownloadAllowed');
    }
    /**
     * (deprecated)
     * @deprecated
     */
    AllowChallengeDownload(a1: boolean) {
        return this.call<boolean>('AllowChallengeDownload', a1);
    }
    /**
     * (deprecated)
     * @deprecated
     */
    IsChallengeDownloadAllowed() {
        return this.call<boolean>('IsChallengeDownloadAllowed');
    }
    /**
     * Returns the path of the game datas directory.
     */
    GameDataDirectory() {
        return this.call<string>('GameDataDirectory');
    }
    /**
     * Returns the path of the maps directory.
     */
    GetMapsDirectory() {
        return this.call<string>('GetMapsDirectory');
    }
    /**
     * (deprecated)
     * @deprecated
     */
    GetTracksDirectory() {
        return this.call<string>('GetTracksDirectory');
    }
    /**
     * Returns the path of the skins directory.
     */
    GetSkinsDirectory() {
        return this.call<string>('GetSkinsDirectory');
    }
    /**
     * Set Team names and colors (deprecated).
     * @deprecated
     */
    SetTeamInfo(
        a1: string,
        a2: number,
        a3: string,
        a4: string,
        a5: number,
        a6: string,
        a7: string,
        a8: number,
        a9: string,
    ) {
        return this.call<boolean>(
            'SetTeamInfo',
            a1,
            Double.from(a2),
            a3,
            a4,
            Double.from(a5),
            a6,
            a7,
            Double.from(a8),
            a9,
        );
    }
    /**
     * Return Team info for a given clan (0 = no clan, 1, 2). The structure contains: Name, ZonePath, City, EmblemUrl,
     * HuePrimary, HueSecondary, RGB, ClubLinkUrl.
     */
    GetTeamInfo(a1: number) {
        return this.call<GetTeamInfo_t>('GetTeamInfo', Integer.from(a1));
    }
    /**
     * Set the clublinks to use for the two clans.
     */
    SetForcedClubLinks(a1: string, a2: string) {
        return this.call<boolean>('SetForcedClubLinks', a1, a2);
    }
    /**
     * Get the forced clublinks.
     */
    GetForcedClubLinks() {
        return this.call<GetForcedClubLinks_t>('GetForcedClubLinks');
    }
    /**
     * (debug tool) Connect a fake player to the server and returns the login.
     */
    ConnectFakePlayer() {
        return this.call<string>('ConnectFakePlayer');
    }
    /**
     * (debug tool) Disconnect a fake player, or all the fake players if login is '*'.
     */
    DisconnectFakePlayer(a1: string) {
        return this.call<boolean>('DisconnectFakePlayer', a1);
    }
    /**
     * Returns the token infos for a player. The returned structure is { TokenCost, CanPayToken }.
     */
    GetDemoTokenInfosForPlayer(a1: string) {
        return this.call<GetDemoTokenInfosForPlayer_t>('GetDemoTokenInfosForPlayer', a1);
    }
    /**
     * Disable player horns.
     */
    DisableHorns(a1: boolean) {
        return this.call<boolean>('DisableHorns', a1);
    }
    /**
     * Returns whether the horns are disabled.
     */
    AreHornsDisabled() {
        return this.call<boolean>('AreHornsDisabled');
    }
    /**
     * Disable the automatic mesages when a player connects/disconnects from the server.
     */
    DisableServiceAnnounces(a1: boolean) {
        return this.call<boolean>('DisableServiceAnnounces', a1);
    }
    /**
     * Returns whether the automatic mesages are disabled.
     */
    AreServiceAnnouncesDisabled() {
        return this.call<boolean>('AreServiceAnnouncesDisabled');
    }
    /**
     * Ignore players profile skin customisation.
     */
    DisableProfileSkins(a1: boolean) {
        return this.call<boolean>('DisableProfileSkins', a1);
    }
    /**
     * Returns whether the custom skins are disabled.
     */
    AreProfileSkinsDisabled() {
        return this.call<boolean>('AreProfileSkinsDisabled');
    }
    /**
     * Enable the autosaving of all replays (vizualisable replays with all players, but not validable) on the server.
     */
    AutoSaveReplays(a1: boolean) {
        return this.call<boolean>('AutoSaveReplays', a1);
    }
    /**
     * Returns if autosaving of all replays is enabled on the server.
     */
    IsAutoSaveReplaysEnabled() {
        return this.call<boolean>('IsAutoSaveReplaysEnabled');
    }
    /**
     * Saves the current replay (vizualisable replays with all players, but not validable). Pass a filename, or '' for
     * an automatic filename.
     */
    SaveCurrentReplay(a1: string) {
        return this.call<boolean>('SaveCurrentReplay', a1);
    }
    /**
     * Saves a replay with the ghost of all the players' best race. First parameter is the login of the player (or ''
     * for all players), Second parameter is the filename, or '' for an automatic filename.
     */
    SaveBestGhostsReplay(a1: string, a2: string) {
        return this.call<boolean>('SaveBestGhostsReplay', a1, a2);
    }
    /**
     * Returns a replay containing the data needed to validate the current best time of the player. The parameter is
     * the login of the player.
     */
    GetValidationReplay(a1: string) {
        return this.call<string>('GetValidationReplay', a1);
    }
    /**
     * Set new server options using the struct passed as parameters. This struct must contain the following fields :
     * Name, Comment, Password, PasswordForSpectator, NextCallVoteTimeOut, CallVoteRatio. May additionally include any
     * of the other members listed in RpcGetServerOptions. A change of NextMaxPlayers, NextMaxSpectators,
     * NextCallVoteTimeOut requires a map restart to be taken into account.
     */
    SetServerOptions(a1: SetServerOptions_t) {
        return this.call<boolean>('SetServerOptions', a1);
    }
    /**
     * Optional parameter for compatibility: struct version (0 = united, 1 = forever). Returns a struct containing the
     * server options: Name, Comment, Password, PasswordForSpectator, CurrentMaxPlayers, NextMaxPlayers,
     * CurrentMaxSpectators, NextMaxSpectators, IsP2PUpload, IsP2PDownload, CurrentLadderMode, NextLadderMode,
     * CurrentVehicleNetQuality, NextVehicleNetQuality, CurrentCallVoteTimeOut, NextCallVoteTimeOut, CallVoteRatio,
     * AllowChallengeDownload and AutoSaveReplays, and additionally for forever: RefereePassword, RefereeMode,
     * AutoSaveValidationReplays, HideServer, CurrentUseChangingValidationSeed, NextUseChangingValidationSeed.
     */
    GetServerOptions(a1: number) {
        return this.call<GetServerOptions_t>('GetServerOptions', Integer.from(a1));
    }
    /**
     * Set whether the players can choose their side or if the teams are forced by the server (using
     * ForcePlayerTeam()).
     */
    SetForcedTeams(a1: boolean) {
        return this.call<boolean>('SetForcedTeams', a1);
    }
    /**
     * Returns whether the players can choose their side or if the teams are forced by the server.
     */
    GetForcedTeams() {
        return this.call<boolean>('GetForcedTeams');
    }
    /**
     * Set the mods to apply on the clients. Parameters: Override, if true even the maps with a mod will be overridden
     * by the server setting; and Mods, an array of structures [{EnvName, Url}, ...]. Requires a map restart to be
     * taken into account.
     */
    SetForcedMods(a1: boolean, a2: SetForcedMods_t[]) {
        return this.call<boolean>('SetForcedMods', a1, a2);
    }
    /**
     * Get the mods settings.
     */
    GetForcedMods() {
        return this.call<GetForcedMods_t>('GetForcedMods');
    }
    /**
     * Set the music to play on the clients. Parameters: Override, if true even the maps with a custom music will be
     * overridden by the server setting, and a UrlOrFileName for the music. Requires a map restart to be taken into
     * account.
     */
    SetForcedMusic(a1: boolean, a2: string) {
        return this.call<boolean>('SetForcedMusic', a1, a2);
    }
    /**
     * Get the music setting.
     */
    GetForcedMusic() {
        return this.call<GetForcedMusic_t>('GetForcedMusic');
    }
    /**
     * Defines a list of remappings for player skins. It expects a list of structs Orig, Name, Checksum, Url. Orig is
     * the name of the skin to remap, or '*' for any other. Name, Checksum, Url define the skin to use. (They are
     * optional, you may set value '' for any of those. All 3 null means same as Orig). Will only affect players
     * connecting after the value is set.
     */
    SetForcedSkins(a1: SetForcedSkins_t[]) {
        return this.call<boolean>('SetForcedSkins', a1);
    }
    /**
     * Get the current forced skins.
     */
    GetForcedSkins() {
        return this.call<GetForcedSkins_t[]>('GetForcedSkins');
    }
    /**
     * Returns the last error message for an internet connection.
     */
    GetLastConnectionErrorMessage() {
        return this.call<string>('GetLastConnectionErrorMessage');
    }
    /**
     * Get the current mode script.
     */
    GetModeScriptText() {
        return this.call<string>('GetModeScriptText');
    }
    /**
     * Set the mode script and restart.
     */
    SetModeScriptText(a1: string) {
        return this.call<boolean>('SetModeScriptText', a1);
    }
    /**
     * Returns the description of the current mode script, as a structure containing: Name, CompatibleTypes,
     * Description, Version and the settings available.
     */
    GetModeScriptInfo() {
        return this.call<GetModeScriptInfo_t>('GetModeScriptInfo');
    }
    /**
     * Returns the current settings of the mode script.
     */
    GetModeScriptSettings() {
        return this.call<GetModeScriptSettings_t>('GetModeScriptSettings');
    }
    /**
     * Change the settings of the mode script.
     */
    SetModeScriptSettings(a1: SetModeScriptSettings_t) {
        return this.call<boolean>('SetModeScriptSettings', a1);
    }
    /**
     * Send commands to the mode script.
     */
    SendModeScriptCommands(a1: SendModeScriptCommands_t) {
        return this.call<boolean>('SendModeScriptCommands', a1);
    }
    /**
     * Change the settings and send commands to the mode script.
     */
    SetModeScriptSettingsAndCommands(a1: SetModeScriptSettingsAndCommands_t, a2: SetModeScriptSettingsAndCommands_t) {
        return this.call<boolean>('SetModeScriptSettingsAndCommands', a1, a2);
    }
    /**
     * Returns the current xml-rpc variables of the mode script.
     */
    GetModeScriptVariables() {
        return this.call<GetModeScriptVariables_t>('GetModeScriptVariables');
    }
    /**
     * Set the xml-rpc variables of the mode script.
     */
    SetModeScriptVariables(a1: SetModeScriptVariables_t) {
        return this.call<boolean>('SetModeScriptVariables', a1);
    }
    /**
     * Send an event to the mode script.
     */
    TriggerModeScriptEvent(a1: string, a2: string) {
        return this.call<boolean>('TriggerModeScriptEvent', a1, a2);
    }
    /**
     * Send an event to the mode script.
     */
    TriggerModeScriptEventArray(a1: string, a2: TriggerModeScriptEventArray_t[]) {
        return this.call<boolean>('TriggerModeScriptEventArray', a1, a2);
    }
    /**
     * Set the ServerPlugin settings. Parameters: ForceReload to reload from disk, optionally: Name the filename
     * relative to Scripts/ directory, Settings the script #Settings to apply.
     */
    SetServerPlugin(a1: boolean, a2: string, a3: SetServerPlugin_t) {
        return this.call<boolean>('SetServerPlugin', a1, a2, a3);
    }
    /**
     * Get the ServerPlugin current settings.
     */
    GetServerPlugin() {
        return this.call<GetServerPlugin_t>('GetServerPlugin');
    }
    /**
     * Returns the current xml-rpc variables of the server script.
     */
    GetServerPluginVariables() {
        return this.call<GetServerPluginVariables_t>('GetServerPluginVariables');
    }
    /**
     * Set the xml-rpc variables of the server script.
     */
    SetServerPluginVariables(a1: SetServerPluginVariables_t) {
        return this.call<boolean>('SetServerPluginVariables', a1);
    }
    /**
     * Send an event to the server script.
     */
    TriggerServerPluginEvent(a1: string, a2: string) {
        return this.call<boolean>('TriggerServerPluginEvent', a1, a2);
    }
    /**
     * Send an event to the server script.
     */
    TriggerServerPluginEventArray(a1: string, a2: TriggerServerPluginEventArray_t[]) {
        return this.call<boolean>('TriggerServerPluginEventArray', a1, a2);
    }
    /**
     * Get the script cloud variables of given object.
     */
    GetScriptCloudVariables(a1: string, a2: string) {
        return this.call<GetScriptCloudVariables_t>('GetScriptCloudVariables', a1, a2);
    }
    /**
     * Set the script cloud variables of given object.
     */
    SetScriptCloudVariables(a1: string, a2: string, a3: SetScriptCloudVariables_t) {
        return this.call<boolean>('SetScriptCloudVariables', a1, a2, a3);
    }
    /**
     * Restarts the map, with an optional boolean parameter DontClearCupScores (only available in cup mode).
     */
    RestartMap() {
        return this.call<boolean>('RestartMap');
    }
    /**
     * Switch to next map, with an optional boolean parameter DontClearCupScores (only available in cup mode).
     */
    NextMap() {
        return this.call<boolean>('NextMap');
    }
    /**
     * Attempt to balance teams.
     */
    AutoTeamBalance() {
        return this.call<boolean>('AutoTeamBalance');
    }
    /**
     * (deprecated)
     * @deprecated
     */
    ChallengeRestart() {
        return this.call<boolean>('ChallengeRestart');
    }
    /**
     * (deprecated)
     * @deprecated
     */
    RestartChallenge() {
        return this.call<boolean>('RestartChallenge');
    }
    /**
     * (deprecated)
     * @deprecated
     */
    NextChallenge() {
        return this.call<boolean>('NextChallenge');
    }
    /**
     * Stop the server.
     */
    StopServer() {
        return this.call<boolean>('StopServer');
    }
    /**
     * Set new game settings using the struct passed as parameters. This struct must contain the following fields :
     * GameMode, ChatTime, RoundsPointsLimit, RoundsUseNewRules, RoundsForcedLaps, TimeAttackLimit,
     * TimeAttackSynchStartPeriod, TeamPointsLimit, TeamMaxPoints, TeamUseNewRules, LapsNbLaps, LapsTimeLimit,
     * FinishTimeout, and optionally: AllWarmUpDuration, DisableRespawn, ForceShowAllOpponents,
     * RoundsPointsLimitNewRules, TeamPointsLimitNewRules, CupPointsLimit, CupRoundsPerChallenge, CupNbWinners,
     * CupWarmUpDuration. Requires a map restart to be taken into account.
     */
    SetGameInfos(a1: SetGameInfos_t) {
        return this.call<boolean>('SetGameInfos', a1);
    }
    /**
     * Optional parameter for compatibility: struct version (0 = united, 1 = forever). Returns a struct containing the
     * current game settings, ie: GameMode, ChatTime, NbChallenge, RoundsPointsLimit, RoundsUseNewRules,
     * RoundsForcedLaps, TimeAttackLimit, TimeAttackSynchStartPeriod, TeamPointsLimit, TeamMaxPoints, TeamUseNewRules,
     * LapsNbLaps, LapsTimeLimit, FinishTimeout, and additionally for version 1: AllWarmUpDuration, DisableRespawn,
     * ForceShowAllOpponents, RoundsPointsLimitNewRules, TeamPointsLimitNewRules, CupPointsLimit,
     * CupRoundsPerChallenge, CupNbWinners, CupWarmUpDuration.
     */
    GetCurrentGameInfo(a1: number) {
        return this.call<GetCurrentGameInfo_t>('GetCurrentGameInfo', Integer.from(a1));
    }
    /**
     * Optional parameter for compatibility: struct version (0 = united, 1 = forever). Returns a struct containing the
     * game settings for the next map, ie: GameMode, ChatTime, NbChallenge, RoundsPointsLimit, RoundsUseNewRules,
     * RoundsForcedLaps, TimeAttackLimit, TimeAttackSynchStartPeriod, TeamPointsLimit, TeamMaxPoints, TeamUseNewRules,
     * LapsNbLaps, LapsTimeLimit, FinishTimeout, and additionally for version 1: AllWarmUpDuration, DisableRespawn,
     * ForceShowAllOpponents, RoundsPointsLimitNewRules, TeamPointsLimitNewRules, CupPointsLimit,
     * CupRoundsPerChallenge, CupNbWinners, CupWarmUpDuration.
     */
    GetNextGameInfo(a1: number) {
        return this.call<GetNextGameInfo_t>('GetNextGameInfo', Integer.from(a1));
    }
    /**
     * Optional parameter for compatibility: struct version (0 = united, 1 = forever). Returns a struct containing two
     * other structures, the first containing the current game settings and the second the game settings for next map.
     * The first structure is named CurrentGameInfos and the second NextGameInfos.
     */
    GetGameInfos(a1: number) {
        return this.call<GetGameInfos_t>('GetGameInfos', Integer.from(a1));
    }
    /**
     * Set whether to override the players preferences and always display all opponents (0=no override, 1=show all,
     * other value=minimum number of opponents). Requires a map restart to be taken into account.
     */
    SetForceShowAllOpponents(a1: number) {
        return this.call<boolean>('SetForceShowAllOpponents', Integer.from(a1));
    }
    /**
     * Get whether players are forced to show all opponents. The struct returned contains two fields CurrentValue and
     * NextValue.
     */
    GetForceShowAllOpponents() {
        return this.call<GetForceShowAllOpponents_t>('GetForceShowAllOpponents');
    }
    /**
     * Set a new mode script name for script mode. Requires a map restart to be taken into account.
     */
    SetScriptName(a1: string) {
        return this.call<boolean>('SetScriptName', a1);
    }
    /**
     * Get the current and next mode script name for script mode. The struct returned contains two fields CurrentValue
     * and NextValue.
     */
    GetScriptName() {
        return this.call<GetScriptName_t>('GetScriptName');
    }
    /**
     * (deprecated)
     * @deprecated
     */
    SetCupRoundsPerChallenge(a1: number) {
        return this.call<boolean>('SetCupRoundsPerChallenge', Integer.from(a1));
    }
    /**
     * (deprecated)
     * @deprecated
     */
    GetCupRoundsPerChallenge() {
        return this.call<GetCupRoundsPerChallenge_t>('GetCupRoundsPerChallenge');
    }
    /**
     * Returns the current map index in the selection, or -1 if the map is no longer in the selection.
     */
    GetCurrentMapIndex() {
        return this.call<number>('GetCurrentMapIndex');
    }
    /**
     * Returns the map index in the selection that will be played next (unless the current one is restarted...)
     */
    GetNextMapIndex() {
        return this.call<number>('GetNextMapIndex');
    }
    /**
     * Sets the map index in the selection that will be played next (unless the current one is restarted...)
     */
    SetNextMapIndex(a1: number) {
        return this.call<boolean>('SetNextMapIndex', Integer.from(a1));
    }
    /**
     * Sets the map in the selection that will be played next (unless the current one is restarted...)
     */
    SetNextMapIdent(a1: string) {
        return this.call<boolean>('SetNextMapIdent', a1);
    }
    /**
     * Immediately jumps to the map designated by the index in the selection.
     */
    JumpToMapIndex(a1: number) {
        return this.call<boolean>('JumpToMapIndex', Integer.from(a1));
    }
    /**
     * Immediately jumps to the map designated by its identifier (it must be in the selection).
     */
    JumpToMapIdent(a1: string) {
        return this.call<boolean>('JumpToMapIdent', a1);
    }
    /**
     * Returns a struct containing the infos for the current map. The struct contains the following fields : Name,
     * UId, FileName, Author, AuthorNickname, Environnement, Mood, BronzeTime, SilverTime, GoldTime, AuthorTime,
     * CopperPrice, LapRace, NbLaps, NbCheckpoints, MapType, MapStyle.
     */
    GetCurrentMapInfo() {
        return this.call<GetCurrentMapInfo_t>('GetCurrentMapInfo');
    }
    /**
     * Returns a struct containing the infos for the next map. The struct contains the following fields : Name, UId,
     * FileName, Author, AuthorNickname, Environnement, Mood, BronzeTime, SilverTime, GoldTime, AuthorTime,
     * CopperPrice, LapRace, MapType, MapStyle. (NbLaps and NbCheckpoints are also present but always set to -1)
     */
    GetNextMapInfo() {
        return this.call<GetNextMapInfo_t>('GetNextMapInfo');
    }
    /**
     * Returns a struct containing the infos for the map with the specified filename. The struct contains the
     * following fields : Name, UId, FileName, Author, AuthorNickname, Environnement, Mood, BronzeTime, SilverTime,
     * GoldTime, AuthorTime, CopperPrice, LapRace, MapType, MapStyle. (NbLaps and NbCheckpoints are also present but
     * always set to -1)
     */
    GetMapInfo(a1: string) {
        return this.call<GetMapInfo_t>('GetMapInfo', a1);
    }
    /**
     * Returns a boolean if the map with the specified filename matches the current server settings.
     */
    CheckMapForCurrentServerParams(a1: string) {
        return this.call<boolean>('CheckMapForCurrentServerParams', a1);
    }
    /**
     * Returns a list of maps among the current selection of the server. This method take two parameters. The first
     * parameter specifies the maximum number of infos to be returned, and the second one the starting index in the
     * selection. The list is an array of structures. Each structure contains the following fields : Name, UId,
     * FileName, Environnement, Author, AuthorNickname, GoldTime, CopperPrice, MapType, MapStyle.
     */
    GetMapList(a1: number, a2: number) {
        return this.call<GetMapList_t[]>('GetMapList', Integer.from(a1), Integer.from(a2));
    }
    /**
     * Add the map with the specified filename at the end of the current selection.
     */
    AddMap(a1: string) {
        return this.call<boolean>('AddMap', a1);
    }
    /**
     * Add the list of maps with the specified filenames at the end of the current selection. The list of maps to add
     * is an array of strings.
     */
    AddMapList(a1: AddMapList_t[]) {
        return this.call<number>('AddMapList', a1);
    }
    /**
     * Remove the map with the specified filename from the current selection.
     */
    RemoveMap(a1: string) {
        return this.call<boolean>('RemoveMap', a1);
    }
    /**
     * Remove the list of maps with the specified filenames from the current selection. The list of maps to remove is
     * an array of strings.
     */
    RemoveMapList(a1: RemoveMapList_t[]) {
        return this.call<number>('RemoveMapList', a1);
    }
    /**
     * Insert the map with the specified filename after the current map.
     */
    InsertMap(a1: string) {
        return this.call<boolean>('InsertMap', a1);
    }
    /**
     * Insert the list of maps with the specified filenames after the current map. The list of maps to insert is an
     * array of strings.
     */
    InsertMapList(a1: InsertMapList_t[]) {
        return this.call<number>('InsertMapList', a1);
    }
    /**
     * Set as next map the one with the specified filename, if it is present in the selection.
     */
    ChooseNextMap(a1: string) {
        return this.call<boolean>('ChooseNextMap', a1);
    }
    /**
     * Set as next maps the list of maps with the specified filenames, if they are present in the selection. The list
     * of maps to choose is an array of strings.
     */
    ChooseNextMapList(a1: ChooseNextMapList_t[]) {
        return this.call<number>('ChooseNextMapList', a1);
    }
    /**
     * (deprecated)
     * @deprecated
     */
    GetCurrentChallengeIndex() {
        return this.call<number>('GetCurrentChallengeIndex');
    }
    /**
     * (deprecated)
     * @deprecated
     */
    GetNextChallengeIndex() {
        return this.call<number>('GetNextChallengeIndex');
    }
    /**
     * (deprecated)
     * @deprecated
     */
    SetNextChallengeIndex(a1: number) {
        return this.call<boolean>('SetNextChallengeIndex', Integer.from(a1));
    }
    /**
     * (deprecated)
     * @deprecated
     */
    GetCurrentChallengeInfo() {
        return this.call<GetCurrentChallengeInfo_t>('GetCurrentChallengeInfo');
    }
    /**
     * (deprecated)
     * @deprecated
     */
    GetNextChallengeInfo() {
        return this.call<GetNextChallengeInfo_t>('GetNextChallengeInfo');
    }
    /**
     * (deprecated)
     * @deprecated
     */
    GetChallengeInfo(a1: string) {
        return this.call<GetChallengeInfo_t>('GetChallengeInfo', a1);
    }
    /**
     * (deprecated)
     * @deprecated
     */
    CheckChallengeForCurrentServerParams(a1: string) {
        return this.call<boolean>('CheckChallengeForCurrentServerParams', a1);
    }
    /**
     * (deprecated)
     * @deprecated
     */
    GetChallengeList(a1: number, a2: number) {
        return this.call<GetChallengeList_t[]>('GetChallengeList', Integer.from(a1), Integer.from(a2));
    }
    /**
     * (deprecated)
     * @deprecated
     */
    AddChallenge(a1: string) {
        return this.call<boolean>('AddChallenge', a1);
    }
    /**
     * (deprecated)
     * @deprecated
     */
    AddChallengeList(a1: AddChallengeList_t[]) {
        return this.call<number>('AddChallengeList', a1);
    }
    /**
     * (deprecated)
     * @deprecated
     */
    RemoveChallenge(a1: string) {
        return this.call<boolean>('RemoveChallenge', a1);
    }
    /**
     * (deprecated)
     * @deprecated
     */
    RemoveChallengeList(a1: RemoveChallengeList_t[]) {
        return this.call<number>('RemoveChallengeList', a1);
    }
    /**
     * (deprecated)
     * @deprecated
     */
    InsertChallenge(a1: string) {
        return this.call<boolean>('InsertChallenge', a1);
    }
    /**
     * (deprecated)
     * @deprecated
     */
    InsertChallengeList(a1: InsertChallengeList_t[]) {
        return this.call<number>('InsertChallengeList', a1);
    }
    /**
     * (deprecated)
     * @deprecated
     */
    ChooseNextChallenge(a1: string) {
        return this.call<boolean>('ChooseNextChallenge', a1);
    }
    /**
     * (deprecated)
     * @deprecated
     */
    ChooseNextChallengeList(a1: ChooseNextChallengeList_t[]) {
        return this.call<number>('ChooseNextChallengeList', a1);
    }
    /**
     * Set a list of maps defined in the playlist with the specified filename as the current selection of the server,
     * and load the gameinfos from the same file.
     */
    LoadMatchSettings(a1: string) {
        return this.call<number>('LoadMatchSettings', a1);
    }
    /**
     * Add a list of maps defined in the playlist with the specified filename at the end of the current selection.
     */
    AppendPlaylistFromMatchSettings(a1: string) {
        return this.call<number>('AppendPlaylistFromMatchSettings', a1);
    }
    /**
     * Save the current selection of map in the playlist with the specified filename, as well as the current
     * gameinfos.
     */
    SaveMatchSettings(a1: string) {
        return this.call<number>('SaveMatchSettings', a1);
    }
    /**
     * Insert a list of maps defined in the playlist with the specified filename after the current map.
     */
    InsertPlaylistFromMatchSettings(a1: string) {
        return this.call<number>('InsertPlaylistFromMatchSettings', a1);
    }
    /**
     * Returns the list of players on the server. This method take two parameters. The first parameter specifies the
     * maximum number of infos to be returned, and the second one the starting index in the list, an optional 3rd
     * parameter is used for compatibility: struct version (0 = united, 1 = forever, 2 = forever, including the
     * servers). The list is an array of PlayerInfo structures. Forever PlayerInfo struct is: Login, NickName,
     * PlayerId, TeamId, SpectatorStatus, LadderRanking, and Flags. LadderRanking is 0 when not in official mode, Flags
     * = ForceSpectator(0,1,2) + StereoDisplayMode * 1000 + IsManagedByAnOtherServer * 10000 + IsServer * 100000 +
     * HasPlayerSlot * 1000000 + IsBroadcasting * 10000000 + HasJoinedGame * 100000000 SpectatorStatus = Spectator +
     * TemporarySpectator * 10 + PureSpectator * 100 + AutoTarget * 1000 + CurrentTargetId * 10000
     */
    GetPlayerList(a1: number, a2: number, a3: number) {
        return this.call<GetPlayerList_t[]>('GetPlayerList', Integer.from(a1), Integer.from(a2), Integer.from(a3));
    }
    /**
     * Returns a struct containing the infos on the player with the specified login, with an optional parameter for
     * compatibility: struct version (0 = united, 1 = forever). The structure is identical to the ones from
     * GetPlayerList. Forever PlayerInfo struct is: Login, NickName, PlayerId, TeamId, SpectatorStatus, LadderRanking,
     * and Flags. LadderRanking is 0 when not in official mode, Flags = ForceSpectator(0,1,2) + StereoDisplayMode *
     * 1000 + IsManagedByAnOtherServer * 10000 + IsServer * 100000 + HasPlayerSlot * 1000000 + IsBroadcasting *
     * 10000000 + HasJoinedGame * 100000000 SpectatorStatus = Spectator + TemporarySpectator * 10 + PureSpectator * 100
     * + AutoTarget * 1000 + CurrentTargetId * 10000
     */
    GetPlayerInfo(a1: string, a2: number) {
        return this.call<GetPlayerInfo_t>('GetPlayerInfo', a1, Integer.from(a2));
    }
    /**
     * Returns a struct containing the infos on the player with the specified login. The structure contains the
     * following fields : Login, NickName, PlayerId, TeamId, IPAddress, DownloadRate, UploadRate, Language,
     * IsSpectator, IsInOfficialMode, a structure named Avatar, an array of structures named Skins, a structure named
     * LadderStats, HoursSinceZoneInscription and OnlineRights (0: nations account, 3: united account). Each structure
     * of the array Skins contains two fields Environnement and a struct PackDesc. Each structure PackDesc, as well as
     * the struct Avatar, contains two fields FileName and Checksum.
     */
    GetDetailedPlayerInfo(a1: string) {
        return this.call<GetDetailedPlayerInfo_t>('GetDetailedPlayerInfo', a1);
    }
    /**
     * Returns a struct containing the player infos of the game server (ie: in case of a basic server, itself; in case
     * of a relay server, the main server), with an optional parameter for compatibility: struct version (0 = united, 1
     * = forever). The structure is identical to the ones from GetPlayerList. Forever PlayerInfo struct is: Login,
     * NickName, PlayerId, TeamId, SpectatorStatus, LadderRanking, and Flags. LadderRanking is 0 when not in official
     * mode, Flags = ForceSpectator(0,1,2) + StereoDisplayMode * 1000 + IsManagedByAnOtherServer * 10000 + IsServer *
     * 100000 + HasPlayerSlot * 1000000 + IsBroadcasting * 10000000 + HasJoinedGame * 100000000 SpectatorStatus =
     * Spectator + TemporarySpectator * 10 + PureSpectator * 100 + AutoTarget * 1000 + CurrentTargetId * 10000
     */
    GetMainServerPlayerInfo(a1: number) {
        return this.call<GetMainServerPlayerInfo_t>('GetMainServerPlayerInfo', Integer.from(a1));
    }
    /**
     * Returns the current rankings for the race in progress. (In trackmania legacy team modes, the scores for the two
     * teams are returned. In other modes, it's the individual players' scores) This method take two parameters. The
     * first parameter specifies the maximum number of infos to be returned, and the second one the starting index in
     * the ranking. The ranking returned is a list of structures. Each structure contains the following fields : Login,
     * NickName, PlayerId and Rank. In addition, for legacy trackmania modes it also contains BestTime, Score,
     * NbrLapsFinished, LadderScore, and an array BestCheckpoints that contains the checkpoint times for the best race.
     */
    GetCurrentRanking(a1: number, a2: number) {
        return this.call<GetCurrentRanking_t[]>('GetCurrentRanking', Integer.from(a1), Integer.from(a2));
    }
    /**
     * Returns the current ranking for the race in progressof the player with the specified login (or list of
     * comma-separated logins). The ranking returned is a list of structures. Each structure contains the following
     * fields : Login, NickName, PlayerId and Rank. In addition, for legacy trackmania modes it also contains BestTime,
     * Score, NbrLapsFinished, LadderScore, and an array BestCheckpoints that contains the checkpoint times for the
     * best race.
     */
    GetCurrentRankingForLogin(a1: string) {
        return this.call<GetCurrentRankingForLogin_t[]>('GetCurrentRankingForLogin', a1);
    }
    /**
     * Returns the current winning team for the race in progress. (-1: if not in team mode, or draw match)
     */
    GetCurrentWinnerTeam() {
        return this.call<number>('GetCurrentWinnerTeam');
    }
    /**
     * Force the scores of the current game. Only available in rounds and team mode. You have to pass an array of
     * structs {int PlayerId, int Score}. And a boolean SilentMode - if true, the scores are silently updated, allowing
     * an external controller to do its custom counting...
     */
    ForceScores(a1: ForceScores_t[], a2: boolean) {
        return this.call<boolean>('ForceScores', a1, a2);
    }
    /**
     * Force the team of the player. Only available in team mode. You have to pass the login and the team number (0 or
     * 1).
     */
    ForcePlayerTeam(a1: string, a2: number) {
        return this.call<boolean>('ForcePlayerTeam', a1, Integer.from(a2));
    }
    /**
     * Force the team of the player. Only available in team mode. You have to pass the playerid and the team number (0
     * or 1).
     */
    ForcePlayerTeamId(a1: number, a2: number) {
        return this.call<boolean>('ForcePlayerTeamId', Integer.from(a1), Integer.from(a2));
    }
    /**
     * Force the spectating status of the player. You have to pass the login and the spectator mode (0: user
     * selectable, 1: spectator, 2: player, 3: spectator but keep selectable).
     */
    ForceSpectator(a1: string, a2: number) {
        return this.call<boolean>('ForceSpectator', a1, Integer.from(a2));
    }
    /**
     * Force the spectating status of the player. You have to pass the playerid and the spectator mode (0: user
     * selectable, 1: spectator, 2: player, 3: spectator but keep selectable).
     */
    ForceSpectatorId(a1: number, a2: number) {
        return this.call<boolean>('ForceSpectatorId', Integer.from(a1), Integer.from(a2));
    }
    /**
     * Force spectators to look at a specific player. You have to pass the login of the spectator (or '' for all) and
     * the login of the target (or '' for automatic), and an integer for the camera type to use (-1 = leave unchanged,
     * 0 = replay, 1 = follow, 2 = free).
     */
    ForceSpectatorTarget(a1: string, a2: string, a3: number) {
        return this.call<boolean>('ForceSpectatorTarget', a1, a2, Integer.from(a3));
    }
    /**
     * Force spectators to look at a specific player. You have to pass the id of the spectator (or -1 for all) and the
     * id of the target (or -1 for automatic), and an integer for the camera type to use (-1 = leave unchanged, 0 =
     * replay, 1 = follow, 2 = free).
     */
    ForceSpectatorTargetId(a1: number, a2: number, a3: number) {
        return this.call<boolean>('ForceSpectatorTargetId', Integer.from(a1), Integer.from(a2), Integer.from(a3));
    }
    /**
     * Pass the login of the spectator. A spectator that once was a player keeps his player slot, so that he can go
     * back to race mode. Calling this function frees this slot for another player to connect.
     */
    SpectatorReleasePlayerSlot(a1: string) {
        return this.call<boolean>('SpectatorReleasePlayerSlot', a1);
    }
    /**
     * Pass the playerid of the spectator. A spectator that once was a player keeps his player slot, so that he can go
     * back to race mode. Calling this function frees this slot for another player to connect.
     */
    SpectatorReleasePlayerSlotId(a1: number) {
        return this.call<boolean>('SpectatorReleasePlayerSlotId', Integer.from(a1));
    }
    /**
     * Returns a struct containing the networks stats of the server. The structure contains the following fields :
     * Uptime, NbrConnection, MeanConnectionTime, MeanNbrPlayer, RecvNetRate, SendNetRate, TotalReceivingSize,
     * TotalSendingSize and an array of structures named PlayerNetInfos. Each structure of the array PlayerNetInfos
     * contains the following fields : Login, IPAddress, LastTransferTime, DeltaBetweenTwoLastNetState, PacketLossRate.
     */
    GetNetworkStats() {
        return this.call<GetNetworkStats_t>('GetNetworkStats');
    }
    /**
     * Start a server on lan, using the current configuration.
     */
    StartServerLan() {
        return this.call<boolean>('StartServerLan');
    }
    /**
     * Start a server on internet, using the current configuration.
     */
    StartServerInternet() {
        return this.call<boolean>('StartServerInternet');
    }
}

type system_multicall_t = {
    a1: unknown;
};
type GetVersion_t = {
    a1: unknown;
};
type GetStatus_t = {
    a1: unknown;
};
type GetCurrentCallVote_t = {
    a1: unknown;
};
type GetCallVoteTimeOut_t = {
    a1: unknown;
};
// deno-lint-ignore ban-types
type SetCallVoteRatios_t = {};
type GetCallVoteRatios_t = {
    a1: unknown;
};
// deno-lint-ignore ban-types
type SetCallVoteRatiosEx_t = {};
type GetCallVoteRatiosEx_t = {
    a1: unknown;
};
// deno-lint-ignore ban-types
type ChatSendServerMessageToLanguage_t = {};
// deno-lint-ignore ban-types
type ChatSendToLanguage_t = {};
type GetChatLines_t = {
    a1: unknown;
};
type GetManialinkPageAnswers_t = {
    a1: unknown;
};
type GetBanList_t = {
    a1: unknown;
};
type GetBlackList_t = {
    a1: unknown;
};
type GetGuestList_t = {
    a1: unknown;
};
type GetIgnoreList_t = {
    a1: unknown;
};
type GetBillState_t = {
    a1: unknown;
};
type GetSystemInfo_t = {
    PublishedIp: string;
    Port: number;
    P2PPort: number;
    TitleId: string;
    ServerLogin: string;
    ServerPlayerId: number;
    ConnectionDownloadRate: number;
    ConnectionUploadRate: number;
    IsServer: boolean;
    IsDedicated: boolean;
};
type GetServerTags_t = {
    a1: unknown;
};
type GetMaxPlayers_t = {
    a1: unknown;
};
type GetMaxSpectators_t = {
    a1: unknown;
};
type GetLobbyInfo_t = {
    a1: unknown;
};
type GetTeamInfo_t = {
    a1: unknown;
};
type GetForcedClubLinks_t = {
    a1: unknown;
};
type GetDemoTokenInfosForPlayer_t = {
    a1: unknown;
};
// deno-lint-ignore ban-types
type SetServerOptions_t = {};
type GetServerOptions_t = {
    a1: unknown;
};
// deno-lint-ignore ban-types
type SetForcedMods_t = {};
type GetForcedMods_t = {
    a1: unknown;
};
type GetForcedMusic_t = {
    a1: unknown;
};
// deno-lint-ignore ban-types
type SetForcedSkins_t = {};
type GetForcedSkins_t = {
    a1: unknown;
};
type GetModeScriptInfo_t = {
    a1: unknown;
};
type GetModeScriptSettings_t = {
    a1: unknown;
};
// deno-lint-ignore ban-types
type SetModeScriptSettings_t = {};
// deno-lint-ignore ban-types
type SendModeScriptCommands_t = {};
// deno-lint-ignore ban-types
type SetModeScriptSettingsAndCommands_t = {};
type GetModeScriptVariables_t = {
    a1: unknown;
};
// deno-lint-ignore ban-types
type SetModeScriptVariables_t = {};
// deno-lint-ignore ban-types
type TriggerModeScriptEventArray_t = {};
// deno-lint-ignore ban-types
type SetServerPlugin_t = {};
type GetServerPlugin_t = {
    a1: unknown;
};
type GetServerPluginVariables_t = {
    a1: unknown;
};
// deno-lint-ignore ban-types
type SetServerPluginVariables_t = {};
// deno-lint-ignore ban-types
type TriggerServerPluginEventArray_t = {};
type GetScriptCloudVariables_t = {
    a1: unknown;
};
// deno-lint-ignore ban-types
type SetScriptCloudVariables_t = {};
// deno-lint-ignore ban-types
type SetGameInfos_t = {};
type GetCurrentGameInfo_t = {
    a1: unknown;
};
type GetNextGameInfo_t = {
    a1: unknown;
};
type GetGameInfos_t = {
    a1: unknown;
};
type GetForceShowAllOpponents_t = {
    a1: unknown;
};
type GetScriptName_t = {
    a1: unknown;
};
type GetCupRoundsPerChallenge_t = {
    a1: unknown;
};
type GetCurrentMapInfo_t = {
    a1: unknown;
};
type GetNextMapInfo_t = {
    a1: unknown;
};
type GetMapInfo_t = {
    a1: unknown;
};
type GetMapList_t = {
    UId: string;
    Name: string;
    FileName: string;
    Environnement: string;
    Author: string;
    AuthorNickname: string;
    GoldTime: number;
    CopperPrice: number;
    MapType: string;
    MapStyle: string;
};
// deno-lint-ignore ban-types
type AddMapList_t = {};
// deno-lint-ignore ban-types
type RemoveMapList_t = {};
// deno-lint-ignore ban-types
type InsertMapList_t = {};
// deno-lint-ignore ban-types
type ChooseNextMapList_t = {};
type GetCurrentChallengeInfo_t = {
    a1: unknown;
};
type GetNextChallengeInfo_t = {
    a1: unknown;
};
type GetChallengeInfo_t = {
    a1: unknown;
};
type GetChallengeList_t = {
    a1: unknown;
};
// deno-lint-ignore ban-types
type AddChallengeList_t = {};
// deno-lint-ignore ban-types
type RemoveChallengeList_t = {};
// deno-lint-ignore ban-types
type InsertChallengeList_t = {};
// deno-lint-ignore ban-types
type ChooseNextChallengeList_t = {};
type GetPlayerList_t = {
    a1: unknown;
};
type GetPlayerInfo_t = {
    a1: unknown;
};
type GetDetailedPlayerInfo_t = {
    a1: unknown;
};
type GetMainServerPlayerInfo_t = {
    a1: unknown;
};
type GetCurrentRanking_t = {
    a1: unknown;
};
type GetCurrentRankingForLogin_t = {
    a1: unknown;
};
// deno-lint-ignore ban-types
type ForceScores_t = {};
type GetNetworkStats_t = {
    a1: unknown;
};
