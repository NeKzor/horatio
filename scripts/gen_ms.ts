// Copyright (c) 2023, NeKz
// SPDX-License-Identifier: MIT

import * as libclang from 'libclang/mod.ts';

// Use fixed doc.h because the script doc generator produces invalid C++ code :(
const headerFile = 'scripts/data/doc_fixed.h';

const index = new libclang.CXIndex();
const tu = index.parseTranslationUnit(headerFile, ['-xc++']);

console.log(`// Copyright (c) 2023, NeKz
// SPDX-License-Identifier: MIT

// DO NOT EDIT!
// This file has been generated with "deno task ms".
`);

// Prelude types.
console.log(`// deno-lint-ignore-file no-empty-interface adjacent-overload-signatures no-namespace no-empty-enum
export type int = number;
export type Void = void;
export type Integer = number;
export type Real = number;
export type Boolean = boolean;
export type Text = string;`);

const getType = (type: libclang.CXType | null) => {
    const spelling = type?.getSpelling();

    // NOTE: Necessary hack to reference enum inside namespace.
    if (spelling?.startsWith('CMapEditorPlugin')) {
        return spelling
            .split('::')
            .join('__');
    }

    const realType = spelling
        ?.replace('class ', '')
        ?.replace(' *const', '')
        ?.replace(' *', '')
        ?.replace('const ', '');

    // Reference namespace directly.
    if (realType?.startsWith('NWebServicesPrestige') || realType?.startsWith('NSystemConfig')) {
        return realType
            .split('::')
            .join('.');
    }

    return realType
        ?.split('::')
        ?.join(inNamespace ? '.' : '__') ?? 'unknown';
};

const writeComment = (cursor: libclang.CXCursor, ident = false) => {
    const [start, ...comment] = cursor
        .getRawCommentText()
        .replace('/*!', '/**')
        .replace('\\brief ', '')
        .replaceAll('\\param', '@param')
        .split('\n');

    if (comment.slice(0, -1).join('').replaceAll('*', '').trim() === '') {
        return;
    }

    console.log(
        (ident ? '    ' : '') + [
            start?.trim(),
            ...comment
                .map((line) => line.trim())
                .filter((line) => line && line !== '*')
                .map((line) => line.startsWith('*') ? line : '* ' + line),
        ].join('\n' + (ident ? '     ' : ' ')),
    );
};

const primitives = ['Void', 'Integer', 'Real', 'Boolean', 'Text'];

const enums: string[] = [];
const enumCache = new Map<string, string>();

let currentClass = '';
let inNamespace = false;

const dump = (parent: libclang.CXCursor) => {
    parent.visitChildren((cursor) => {
        switch (cursor.kind) {
            case libclang.CXCursorKind.CXCursor_ClassDecl:
            case libclang.CXCursorKind.CXCursor_StructDecl: {
                if (!cursor.isDefinition()) {
                    break;
                }

                currentClass = cursor.getSpelling();
                if (cursor.kind === libclang.CXCursorKind.CXCursor_StructDecl && primitives.includes(currentClass)) {
                    break;
                }

                let didWriteClass = false;

                cursor.visitChildren((child) => {
                    switch (child.kind) {
                        case libclang.CXCursorKind.CXCursor_CXXBaseSpecifier: {
                            const baseType = child.getSpelling().split(' ').at(1);
                            // NOTE: Necessary hack to avoid type collision.
                            const extendsFrom = baseType === 'CManiaAppEvent'
                                ? `Omit<CManiaAppEvent, 'Type'>`
                                : baseType === 'CMapEditorPlugin'
                                ? `Omit<CMapEditorPlugin, 'ValidationStatus'>`
                                : baseType === 'CMode'
                                ? `Omit<CMode, 'PassOn' | 'Discard'>`
                                : baseType === 'NGameScriptChat::SEvent'
                                ? `NGameScriptChat.SEvent`
                                : baseType;
                            writeComment(child);
                            console.log(
                                `export interface ${currentClass} extends ${extendsFrom} {`,
                            );
                            didWriteClass = true;
                            return libclang.CXChildVisitResult.CXChildVisit_Break;
                        }
                        default:
                            break;
                    }
                    return libclang.CXChildVisitResult.CXChildVisit_Continue;
                });

                !didWriteClass && (() => {
                    writeComment(cursor);
                    console.log(`export interface ${currentClass} {`);
                })();
                dump(cursor);
                console.log(`}`);
                currentClass = '';
                break;
            }
            case libclang.CXCursorKind.CXCursor_ClassTemplate: {
                writeComment(cursor);
                console.log(`export interface ${cursor.getSpelling()}<`);

                cursor.visitChildren((child) => {
                    switch (child.kind) {
                        case libclang.CXCursorKind.CXCursor_TemplateTypeParameter: {
                            console.log(`    ${child.getSpelling()},`);
                            break;
                        }
                        default:
                            break;
                    }
                    return libclang.CXChildVisitResult.CXChildVisit_Continue;
                });

                console.log(`> {`);
                dump(cursor);
                console.log(`}`);
                break;
            }
            case libclang.CXCursorKind.CXCursor_FunctionDecl:
            case libclang.CXCursorKind.CXCursor_CXXMethod: {
                writeComment(cursor, true);
                const returnType = cursor.getResultType();
                const argCount = cursor.getNumberOfArguments();
                const prefix = cursor.kind === libclang.CXCursorKind.CXCursor_FunctionDecl
                    ? 'export declare function '
                    : '';
                const method = cursor.getSpelling();
                const isIndexOperator = method === 'operator[]';
                if (!argCount) {
                    console.log(
                        `    ${prefix}${isIndexOperator ? '' : method}(): ${getType(returnType)};`,
                    );
                    break;
                }
                !isIndexOperator && console.log(`    ${prefix}${method}(`);
                for (let i = 0; i < argCount; i += 1) {
                    const arg = cursor.getArgument(i);
                    if (isIndexOperator) {
                        console.log(
                            `    op_index(${arg?.getSpelling() ? arg?.getSpelling() : `a${i}`}: ${
                                getType(arg!.getType())
                            }): ${getType(returnType)};`,
                        );
                        break;
                    } else {
                        console.log(
                            `        ${arg?.getSpelling() ? arg?.getSpelling() : `a${i}`}: ${getType(arg!.getType())},`,
                        );
                    }
                }
                !isIndexOperator && console.log(`    ): ${getType(returnType)};`);
                break;
            }
            case libclang.CXCursorKind.CXCursor_ParmDecl: {
                console.log(
                    `    ${cursor.getSpelling()}: ${cursor.getType()?.getSpelling()?.split(' ')?.at(1) ?? 'unknown'},`,
                );
                dump(cursor);
                break;
            }
            case libclang.CXCursorKind.CXCursor_TemplateTypeParameter: {
                // Ignore (already handled)
                break;
            }
            case libclang.CXCursorKind.CXCursor_FieldDecl: {
                writeComment(cursor, true);
                console.log(`    ${cursor.getSpelling()}: ${getType(cursor.getType())};`);
                break;
            }
            case libclang.CXCursorKind.CXCursor_VarDecl: {
                const name = cursor.getSpelling();
                cursor.visitChildren((child) => {
                    switch (child.kind) {
                        case libclang.CXCursorKind.CXCursor_UnexposedExpr: {
                            child.visitChildren((value) => {
                                switch (value.kind) {
                                    case libclang.CXCursorKind.CXCursor_FloatingLiteral: {
                                        console.log(
                                            `    export declare const ${name} = ${value.Evaluate().getAsDouble()};`,
                                        );
                                        break;
                                    }
                                    default:
                                        break;
                                }
                                return libclang.CXChildVisitResult.CXChildVisit_Continue;
                            });
                            break;
                        }
                        default:
                            break;
                    }
                    return libclang.CXChildVisitResult.CXChildVisit_Continue;
                });
                break;
            }
            case libclang.CXCursorKind.CXCursor_CXXAccessSpecifier: {
                // Ignore
                break;
            }
            case libclang.CXCursorKind.CXCursor_EnumDecl: {
                const name = cursor.getSpelling();
                writeComment(cursor);
                (inNamespace ? console.log : enums.push.bind(enums))(
                    `export enum ${(inNamespace ? '' : currentClass + '__') + name} {`,
                );
                if (inNamespace) {
                    enumCache.set(name, name);
                }
                dump(cursor);
                (inNamespace ? console.log : enums.push.bind(enums))(`}`);
                break;
            }
            case libclang.CXCursorKind.CXCursor_EnumConstantDecl: {
                (inNamespace ? console.log : enums.push.bind(enums))(`    ${cursor.getSpelling()},`);
                break;
            }
            case libclang.CXCursorKind.CXCursor_CXXBaseSpecifier: {
                // Ignore (already handled)
                break;
            }
            case libclang.CXCursorKind.CXCursor_Namespace: {
                inNamespace = true;
                writeComment(cursor);
                console.log(`export namespace ${cursor.getSpelling()} {`);
                dump(cursor);
                console.log(`}`);
                inNamespace = false;
                break;
            }
            case libclang.CXCursorKind.CXCursor_UnexposedDecl: {
                // Ignore
                break;
            }
            case libclang.CXCursorKind.CXCursor_TypedefDecl: {
                // Ignore (primitive already handled)
                break;
            }
            default: {
                console.log('Unknown declaration kind:', cursor.kind);
                Deno.exit(1);
                break;
            }
        }
        return libclang.CXChildVisitResult.CXChildVisit_Continue;
    });
};

dump(tu.getCursor());
enums.forEach((line) => console.log(line));

tu.dispose();
index.dispose();
