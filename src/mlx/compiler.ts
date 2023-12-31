// Copyright (c) 2023, NeKz
// SPDX-License-Identifier: MIT

import { type ParseOptions } from 'npm:@swc/wasm@1.3.101';

const swc = await import('npm:@swc/wasm@1.3.101');

const options: ParseOptions = {
    syntax: 'ecmascript',
    jsx: true,
    dynamicImport: false,
    numericSeparator: false,
    privateMethod: false,
    functionBind: false,
    exportDefaultFrom: false,
    exportNamespaceFrom: false,
    decorators: false,
    decoratorsBeforeExport: false,
    topLevelAwait: false,
    importMeta: false,
};

try {
    const module = swc.parseSync(Deno.readTextFileSync('./src/mlx/scripts/main.ts'), options);
    console.dir(module);
} catch (err) {
    console.error(err);
}
