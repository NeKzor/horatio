// Copyright (c) 2023, NeKz
// SPDX-License-Identifier: MIT

import 'https://deno.land/std@0.208.0/dotenv/load.ts';
import { Remote } from '../src/remote/mod.ts';

using remote = new Remote(Deno.env.get('RPC_HOST')!, Number(Deno.env.get('RPC_PORT')!));
await remote.connect();
await remote.Authenticate(Deno.env.get('RPC_USER')!, Deno.env.get('RPC_PASS')!);

const toType = (type: string, idx: number) => {
    switch (type) {
        case 'array':
        case 'struct': {
            return {
                name: idx === -1 ? 'Return Type' : idx.toString(),
                type,
                fields: [{
                    name: '1',
                    type: 'unknown',
                }],
            };
        }
        case 'boolean':
        case 'int':
        case 'double':
        case 'string':
        case 'base64': {
            return {
                name: idx === -1 ? 'Return Type' : idx.toString(),
                type,
            };
        }
        default: {
            throw new Error(`Unknown type "${type}"!`);
        }
    }
};

const getAuthorization = (help: string) => {
    if (help.includes('Only available to SuperAdmin')) {
        return 'SuperAdmin';
    } else if (help.includes('Only available to Admin')) {
        return 'Admin';
    } else {
        return '';
    }
};

const rpcMethods = await remote['system.listMethods']();
const methods = [];

for (const name of rpcMethods as string[]) {
    const [signature, help] = await remote.multiCall(async (call) => [
        await call['system.methodSignature'](name),
        await call['system.methodHelp'](name),
    ]);
    const params = signature.at(0) as string[];
    methods.push({
        name,
        params: params.slice(1).map(toType),
        returnType: toType(params.at(0)!, -1),
        description: help
            .replaceAll(' Only available to Admin/SuperAdmin.', '')
            .replaceAll(' Only available to SuperAdmin.', '')
            .replaceAll(' Only available to Admin.', '')
            .replaceAll(' (only available for SuperAdmin)', '')
            .replaceAll('\n', ' ')
            .replaceAll('<i>', '')
            .replaceAll('</i>', '')
            .replaceAll('<br/>', ''),
        deprecated: help.includes('(deprecated)'),
        authorization: getAuthorization(help),
    });
}

Deno.writeTextFileSync('methods.json', JSON.stringify({ methods }));
