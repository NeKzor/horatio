// Copyright (c) 2023, NeKz
// SPDX-License-Identifier: MIT

type RpcType = {
    name: string;
    type: string;
    inner_type?: string;
    fields: {
        name: string;
        type: string;
        inner_type?: string;
    }[];
};

type RpcMethod = {
    name: string;
    params: RpcType[];
    returnType: RpcType;
    description: string;
    deprecated: boolean;
    authorization: string;
};

const { methods } = JSON.parse(await Deno.readTextFile('methods.json')) as {
    methods: RpcMethod[];
};

const createParam =
    (method: string) =>
    (withType: boolean) =>
    (value: { type: string; name?: string; inner_type?: string }, idx: number) => {
        const name = (value.name?.length ?? 1) === 1 ? `a${idx + 1}` : value.name;
        switch (value.type) {
            case 'array':
                return value.inner_type
                    ? `${name}` + (withType ? `: ${value.inner_type}[]` : '')
                    : `${name}` + (withType ? `: ${method.replaceAll('.', '_')}_t[]` : '');
            case 'struct':
                return `${name}` + (withType ? `: ${method.replaceAll('.', '_')}_t` : '');
            case 'boolean':
                return `${name}` + (withType ? `: boolean` : '');
            case 'int':
                return withType ? `${name}: number` : `Integer.from(${name})`;
            case 'double':
                return withType ? `${name}: number` : `Double.from(${name})`;
            case 'string':
                return `${name}` + (withType ? `: string` : '');
            case 'base64':
                return withType ? `${name}: string` : `Base64.from(${name})`;
            case 'unknown':
                return `${name}` + (withType ? `: unknown` : '');
            default:
                throw new Error(`Unknown param type "${value}"!`);
        }
    };

const createReturnType = (method: string) => (value: RpcType) => {
    switch (value.type) {
        case 'array':
            return value.inner_type ? `${value.inner_type}[]` : `${method.replaceAll('.', '_')}_t[]`;
        case 'struct':
            return `${method}_t`;
        case 'boolean':
            return `boolean`;
        case 'int':
        case 'double':
            return `number`;
        case 'string':
        case 'base64':
            return `string`;
        case 'unknown':
            return `unknown`;
        default:
            throw new Error(`Unknown param type "${value}"!`);
    }
};

const getAuthorization = (description: string) => {
    if (description.includes('Only available to SuperAdmin')) {
        return 'SuperAdmin';
    } else if (description.includes('Only available to Admin')) {
        return 'Admin';
    } else {
        return '';
    }
};

const structs = new Map<string, RpcMethod>();

console.log(`// Copyright (c) 2023, NeKz
// SPDX-License-Identifier: MIT

import * as XML from 'xml/mod.ts';
import { ParserOptions } from 'xml/utils/types.ts';
import { Base64, deserialize, Double, Integer, serialize } from './xml.ts';

// deno-lint-ignore-file ban-types

export type RpcMethod<P = keyof Remote> = P extends string
    ? P extends Capitalize<P> ? P : P extends \`system.\${string}\` ? P
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

export class Remote {
    #connection: Deno.Conn | null = null;

    /**
     * Construct a new GBX remote object.
     * \`\`\`ts
     * using remote = new Remote('127.0.0.1', 5_000);
     * await remote.connect();
     * await remote.Authenticate(name, password);
     * \`\`\`
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
            return xml !== undefined ? \`<param><value>\${xml}</value></param>\` : '';
        });

        const xml = \`<?xml version="1.0"?><methodCall><methodName>\${methodName}</methodName><params>\${
            xmlParams.join('')
        }</params></methodCall>\`;

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
     * \`\`\`ts
     * const [dataDirectory, chatLines] = await remote.multiCall((call) => [
     *     call.GameDataDirectory(),
     *     call.GetChatLines(),
     * ]);
     * \`\`\`
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
    }`);

const formatComment = (comment: string, isDeprecated: boolean, indentation = 4) => {
    const authorization = getAuthorization(comment);
    const maxLength = 120 - (indentation * 2);

    const lines: string[] = [];
    let line = '';
    for (
        const word of comment.split(' ').filter((word) => word.length)
    ) {
        if (line.length + word.length + 1 > maxLength) {
            lines.push(line);
            line = word;
        } else {
            line += ' ' + word;
        }
    }

    lines.push(line);

    const spaces = ' '.repeat(indentation);
    return `/**\n${spaces} *${lines.join(`\n${spaces} * `)}${isDeprecated ? `\n${spaces} * @deprecated` : ''}${
        authorization ? `\n${spaces} * @authorization ${authorization}` : ''
    }\n${spaces} */`;
};

for (const method of methods) {
    method.params
        .filter((param) => (param.type === 'struct' || param.type === 'array') && !param.inner_type)
        .forEach(() => structs.set(method.name, method));

    if ((method.returnType.type === 'struct' || method.returnType.type === 'array') && !method.returnType.inner_type) {
        structs.set(method.name, method);
    }

    const escapeName = method.name.includes('.');

    const asParam = createParam(method.name);
    const signature = method.params.map(asParam(true)).join(', ');
    const params = method.params.map(asParam(false)).join(', ');
    const rt = createReturnType(method.name)(method.returnType);

    console.log(
        `    ${formatComment(method.description, method.deprecated)}
    ${escapeName ? `'${method.name}'` : method.name}(${signature}) {
        return this.call<${rt}>('${method.name}'${params.length ? ', ' + params : ''});
    }`,
    );
}

console.log(`}
`);

for (const [struct, method] of structs) {
    if (!method.returnType.fields) {
        console.log(`// deno-lint-ignore ban-types\ntype ${struct}_t = {};`);
        continue;
    }

    const param = createParam(struct)(true);
    console.log(`type ${struct.replaceAll('.', '_')}_t = {
    ${method.returnType.fields.map(param).join(';\n    ')};
};`);
}
