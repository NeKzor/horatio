// Copyright (c) 2023, NeKz
// SPDX-License-Identifier: MIT

import * as XML from 'xml/mod.ts';
import { ParserOptions } from 'xml/utils/types.ts';
import { RemoteMethods, RpcMethod } from './methods.ts';
import type { MultiCall, RpcCall, RpcMethodResponse, RpcResponse } from './types.ts';
import { deserialize, serialize } from './xml.ts';

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
    #target = new EventTarget();
    #handle = 0x80000000;
    #abortController: AbortController | null = null;
    #listener: Promise<void> | null = null;

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
        if (this.#connection) {
            throw new Error('Already connected.');
        }

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

        this.#listener = this.listen(this.#abortController = new AbortController());
    }
    /**
     * Close the connection.
     */
    close() {
        this.#abortController?.abort();
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

        const payload = encoder.encode(xml);
        const buffer = new Uint8Array(8 + payload.byteLength);
        const view = new DataView(buffer.buffer);

        this.#handle = this.#handle + 1 === 0xFFFFFFFF ? 0x80000001 : this.#handle + 1;
        const handle = this.#handle;

        view.setUint32(0, payload.byteLength, true);
        view.setUint32(4, handle, true);
        buffer.set(payload, 8);

        const writer = this.#connection.writable.getWriter();
        await writer.write(buffer);
        writer.releaseLock();

        return new Promise<T>((resolve, reject) => {
            const id = `response:${handle}`;

            const responseHandler = (event: Event) => {
                try {
                    const doc = (event as CustomEvent).detail as RpcResponse<RpcMethodResponse>;
                    if (!doc.methodResponse) {
                        throw new Error('Received invalid document.', { cause: JSON.stringify(doc) });
                    }

                    if ('fault' in doc.methodResponse) {
                        throw new Error('XML-RPC fault.', { cause: doc.methodResponse.fault });
                    }

                    const result = Object.values(doc.methodResponse.params.param.value).at(0);
                    resolve(deserialize<T>(result));
                } catch (err) {
                    reject(err);
                } finally {
                    this.#target.removeEventListener(id, responseHandler);
                }
            };

            this.#target.addEventListener(id, responseHandler);
        });
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
    protected readHeader(chunk: Uint8Array) {
        const view = new DataView(chunk.buffer);
        const length = view.getUint32(0, true);
        const handle = view.getUint32(4, true);
        const isCallback = (handle & 0x80000000) === 0;
        return {
            length,
            handle,
            isCallback,
        };
    }
    protected readBody(chunk: Uint8Array) {
        const decoded = decoder.decode(chunk);
        return XML.parse(decoded, xmlOptions) as unknown as RpcResponse | RpcCall;
    }
    protected async listen(ac: AbortController) {
        const reader = this.#connection!.readable.getReader();

        while (!ac.signal.aborted) {
            const _concat = (a: Uint8Array, b: Uint8Array) => {
                const c = new Uint8Array(a.byteLength + b.byteLength);
                c.set(a, 0);
                c.set(b, a.byteLength);
                return c;
            };

            try {
                const res = await reader.read();
                //console.log(new Date(), { res });

                if (res.done || ac.signal.aborted) {
                    break;
                }

                // TODO: This is still flaky
                const process = async (chunk: Uint8Array) => {
                    const isHeader = chunk.byteLength === 8;
                    const { isCallback, handle, length } = this.readHeader(chunk);
                    let body: RpcResponse | RpcCall;
                    let nextChunk: Uint8Array;

                    if (isHeader) {
                        const res = await reader.read();
                        if (res.done || ac.signal.aborted) {
                            return;
                        }

                        chunk = res.value;

                        body = this.readBody(chunk.slice(0, length));
                        nextChunk = chunk.slice(length);
                    } else {
                        body = this.readBody(chunk.slice(8, length + 8));
                        nextChunk = chunk.slice(length + 8);
                    }

                    //console.dir({ body }, { depth: 16 });

                    if (isCallback) {
                        this.dispatchEvent(new CustomEvent('callback', { detail: deserialize(body) }));
                    } else {
                        this.dispatchEvent(new CustomEvent(`response:${handle}`, { detail: body }));
                    }

                    //console.log(nextChunk);

                    if (nextChunk.byteLength) {
                        await process(nextChunk);
                    }
                };

                await process(res.value);
            } catch (err) {
                if (!(err instanceof Deno.errors.Interrupted)) {
                    console.log('ERROR', err.message, JSON.stringify(err));
                }
                break;
            }
        }
    }
    addEventListener(
        type: 'callback',
        callback: (event: CustomEvent<RpcCall>) => void,
        options?: boolean | AddEventListenerOptions | undefined,
    ): void {
        return this.#target.addEventListener(type, callback as EventListenerOrEventListenerObject, options);
    }
    dispatchEvent(event: Event): boolean {
        return this.#target.dispatchEvent(event);
    }
    removeEventListener(
        type: 'callback',
        callback: (event: CustomEvent<RpcCall>) => void,
        options?: boolean | EventListenerOptions | undefined,
    ): void {
        return this.#target.removeEventListener(type, callback as EventListenerOrEventListenerObject, options);
    }
}
