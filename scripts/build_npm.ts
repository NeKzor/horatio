//Copyright (c) 2023, NeKz
// SPDX-License-Identifier: MIT

import { build, emptyDir } from 'https://deno.land/x/dnt@0.39.0/mod.ts';

const version = Deno.args[0];
if (!version) {
    console.error('You must pass a package version as the first argument');
    Deno.exit(1);
}

const outDir = './npm';

await emptyDir(outDir);

await build({
    entryPoints: ['./src/remote/mod.ts'],
    testPattern: '**.ts',
    rootTestDir: './tests',
    outDir,
    shims: {
        deno: true,
    },
    package: {
        name: '@nekz/gbx-remote',
        version,
        description: 'Type-safe GBX-Remote client.',
        keywords: ['Trackmania'],
        homepage: 'https://horatio.land',
        bugs: {
            url: 'https://github.com/NeKzor/horatio/issues',
        },
        license: 'MIT',
        author: 'NeKz',
        repository: {
            type: 'git',
            url: 'git+https://github.com/NeKzor/horatio.git',
        },
    },
    postBuild() {
        Deno.copyFileSync('LICENSE', 'npm/LICENSE');
        Deno.copyFileSync('src/remote/README.md', 'npm/README.md');
    },
});

// Remove unnecessary fields.

const npmPackage = JSON.parse(await Deno.readTextFile('./npm/package.json'));

delete npmPackage.scripts;
delete npmPackage.devDependencies;

await Deno.writeTextFile('./npm/package.json', JSON.stringify(npmPackage, null, 2));

// Ignore files which should not get published.

await Deno.writeTextFile(
    'npm/.npmignore',
    [
        // Deps, shims and tests are only used for unit testing.
        // There is no need to keep them in the package.
        'esm/deps/',
        'esm/tests/',
        'esm/_dnt.test_shims.d.ts',
        'esm/_dnt.test_shims.js',
        'script/deps/',
        'script/tests/',
        'script/_dnt.test_shims.d.ts',
        'script/_dnt.test_shims.js',
    ].join('\n') + '\n',
    { append: true },
);
