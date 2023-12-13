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

const createParam = (method: string) => (value: RpcType, idx: number) => {
    switch (value.type) {
        case 'array':
            return `a${idx + 1}: T[]`;
        case 'struct':
            return `a${idx + 1}: [${method}_t](#${method.toLowerCase()})`;
        case 'boolean':
            return `a${idx + 1}: bool`;
        case 'int':
            return `a${idx + 1}: i64`;
        case 'double':
            return `a${idx + 1}: f64`;
        case 'string':
        case 'base64':
            return `a${idx + 1}: String`;
        default:
            throw new Error(`Unknown param type "${value}"!`);
    }
};

const createReturnType = (method: string) => (value: RpcType) => {
    switch (value.type) {
        case 'array':
            return `T[]`;
        case 'struct':
            return `[${method}_t](#${method.toLowerCase()})`;
        case 'boolean':
            return `bool`;
        case 'int':
            return `i64`;
        case 'double':
            return `f64`;
        case 'string':
        case 'base64':
            return `String`;
        default:
            throw new Error(`Unknown param type "${value}"!`);
    }
};

const structs = new Set<string>();

console.log(`---
sidebar_position: 2
---

# RPC

## Methods

|Method|Authorization|Description|
|---|:-:|---|`);

for (const method of methods) {
    method.params
        .filter((param) => param.type === 'struct')
        .forEach(() => structs.add(method.name));

    if (method.returnType.type === 'struct') {
        structs.add(method.name);
    }

    const asParam = createParam(method.name);
    const params = method.params.map(asParam);
    const rt = createReturnType(method.name)(method.returnType);
    const description = method.description
        .replaceAll(' Only available to Admin/SuperAdmin.', '')
        .replaceAll(' Only available to SuperAdmin.', '')
        .replaceAll(' Only available to Admin.', '')
        .replaceAll(' (only available for SuperAdmin)', '')
        .replaceAll('{', '\\{')
        .replaceAll('\n', '<br/>');

    console.log(
        `|${method.deprecated ? '~~' : ''}${method.name}(${
            params.length
                ? '<br/>&nbsp;&nbsp;&nbsp;&nbsp;' +
                    params.join(',<br/>&nbsp;&nbsp;&nbsp;&nbsp;') + ',<br/>'
                : ''
        }) → ${rt}${method.deprecated ? '~~' : ''}|${method.authorization}|${description}|`,
    );
}

console.log(`
## Structs
`);

for (const struct of structs) {
    console.log(`### ${struct}\n\n\`\`\`rust\nstruct ${struct}_t {};\n\`\`\`\n`);
}
