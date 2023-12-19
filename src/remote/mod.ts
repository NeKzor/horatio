// Copyright (c) 2023, NeKz
// SPDX-License-Identifier: MIT

import * as XML from 'xml/mod.ts';
import { ParserOptions } from 'xml/utils/types.ts';
import { deserialize, serialize } from './xml.ts';
import { RemoteMethods, RpcMethod } from './methods.ts';

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

const xmlOptions: ParserOptions = {
    emptyToNull: false,
    reviveNumbers: false,
    reviveBooleans: false,
    reviver(options) {
        if (options.tag === 'boolean' && options.value?.toString()?.length) {
            return options.value === '1' ? true : false;
        }
        return options.value;
    },
};

export class Remote extends RemoteMethods {
    #connection: Deno.Conn | null = null;

    /**
     * Construct a new GBX remote object.
     * ```ts
     * using remote = new Remote('127.0.0.1', 5_000);
     * await remote.connect();
     * await remote.Authenticate(name, password);
     * ```
     * @param hostname - IP address or a hostname which can be resolved which points to the dedicated server.
     * @param port - The port to connect to.
     */
    constructor(public readonly hostname: string, public readonly port: number) {
        super();
    }
    /**
     * Connect to the dedicated server.
     */
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
    /**
     * Close the connection.
     */
    close() {
        this.#connection?.close();
        this.#connection = null;
    }
    [Symbol.dispose]() {
        this.close();
    }
    protected async call<T>(methodName: RpcMethod, ...params: unknown[]) {
        if (!this.#connection) {
            throw new Error('Not connected. Did you forget to call connect()?');
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
            const doc = XML.parse(response, xmlOptions) as unknown as RpcResponse;

            if (!doc.methodResponse) {
                throw new Error('Received invalid document.', { cause: response });
            }

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
}
