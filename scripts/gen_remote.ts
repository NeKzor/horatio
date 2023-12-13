// Copyright (c) 2023, NeKz
// SPDX-License-Identifier: MIT

type RpcType = {
    name: string;
    type: string;
    fields: {
        name: string;
        type: string;
    }[];
};

const { methods } = JSON.parse(await Deno.readTextFile('methods.json')) as {
    methods: {
        name: string;
        params: RpcType[];
        returnType: RpcType;
        description: string;
        deprecated: boolean;
        authorization: string;
    }[];
};

const createParam = (method: string) => (withType: boolean) => (value: RpcType, idx: number) => {
    switch (value.type) {
        case 'array':
            return `a${idx + 1}` + (withType ? `: unknown[]` : '');
        case 'struct':
            return `a${idx + 1}` + (withType ? `: ${method}_t` : '');
        case 'boolean':
            return `a${idx + 1}` + (withType ? `: boolean` : '');
        case 'int':
        case 'double':
            return `a${idx + 1}` + (withType ? `: number` : '');
        case 'string':
        case 'base64':
            return `a${idx + 1}` + (withType ? `: string` : '');
        default:
            throw new Error(`Unknown param type "${value}"!`);
    }
};

const createReturnType = (method: string) => (value: RpcType) => {
    switch (value.type) {
        case 'array':
            return `unknown[]`;
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

const structs = new Set<string>();

console.log(`// Copyright (c) 2023, NeKz
// SPDX-License-Identifier: MIT

// deno-lint-ignore-file ban-types

import { GbxClient } from 'npm:@evotm/gbxclient@1.4.1';

export type RpcMethod<P = keyof Remote> = P extends string
    ? P extends Capitalize<P> ? P : P extends \`system.\${string}\` ? P
    : never
    : never;

export class Remote {
    /**
     * Construct a new GBX remote object.
     * \`\`\`ts
     * const remote = new Remote(new GbxClient());
     * await remote.client.connect('127.0.0.1', 5_000);
     * await remote.Authenticate(name, password);
     * \`\`\`
     */
    constructor(public client: GbxClient) {}
    protected call<T>(name: RpcMethod, ...args: unknown[]) {
        return this.client.call(name, ...args) as Promise<T>;
    }
    /**
     * Call multiple methods at once.
     * \`\`\`ts
     * const [dataDirectory, chatLines] = await remote.multiCall(async (call) => [
     *     await call.GameDataDirectory(),
     *     await call.GetChatLines(),
     * ]);
     * \`\`\`
     */
    async multiCall<T extends unknown[]>(
        calls: (remote: MultiCall) => Promise<[...T]>,
    ) {
        const mc = new MultiCall(this.client);
        const res = await calls(mc);
        return mc.client.multicall(mc.queue) as Promise<typeof res>;
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
        .filter((param) => param.type === 'struct')
        .forEach(() => structs.add(method.name));

    if (method.returnType.type === 'struct') {
        structs.add(method.name);
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

export class MultiCall extends Remote {
    queue: unknown[] = [];
  
    call<T>() {
        this.queue.push([...arguments]);
        return Promise.resolve() as T;
    }
}
`);

for (const struct of structs) {
    console.log(`type ${struct}_t = {};`);
}
