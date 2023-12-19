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

// DO NOT EDIT!
// This file has been generated with "deno task gen".

import { Base64, Double, Integer } from './xml.ts';

export type RpcMethod = keyof Omit<RemoteMethods, 'call'>;

export abstract class RemoteMethods {
    protected abstract call<T>(methodName: RpcMethod, ...params: unknown[]): Promise<T>;
`);

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
