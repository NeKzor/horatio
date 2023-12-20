// Copyright (c) 2023, NeKz
// SPDX-License-Identifier: MIT

/** Type for `base64`. */
export class Base64 {
    constructor(public value: string) {}
    static from(value: string) {
        return new this(value);
    }
}

/** Type for `double`. */
export class Double {
    constructor(public value: number) {}
    static from(value: number) {
        return new this(value);
    }
}

/** Type for `int` aka `i4`. */
export class Integer {
    constructor(public value: number) {}
    static from(value: number) {
        return new this(value);
    }
}

/** Serialize XML-RPC. */
export const serialize = (arg: unknown): string | undefined => {
    if (arg === undefined) {
        return undefined;
    }

    if (arg === null) {
        return '<nil/>';
    }

    const type = typeof arg;

    switch (type) {
        case 'string': {
            return `<string>${arg}</string>`;
        }
        case 'number': {
            if (isNaN(arg as number) || !isFinite(arg as number)) {
                throw new Error(`Cannot serialize NaN/Infinity value`);
            }
            return Number.isInteger(arg) ? `<i4>${arg}</i4>` : `<double>${arg}</double>`;
        }
        case 'bigint': {
            return `<int>${arg}</int>`;
        }
        case 'boolean': {
            return `<boolean>${arg ? '1' : '0'}</boolean>`;
        }
        case 'object': {
            switch (true) {
                case arg instanceof Integer: {
                    if (!Number.isInteger(arg.value)) {
                        throw new Error(`Found invalid integer value when integer was expected`);
                    }
                    return `<i4>${arg.value}</i4>`;
                }
                case arg instanceof Double: {
                    return `<double>${arg.value}</double>`;
                }
                case Array.isArray(arg): {
                    return `<array><data>${
                        arg.map((value: unknown) => `<value>${serialize(value)}</value>`).join('')
                    }</data></array>`;
                }
                case arg instanceof Base64: {
                    return `<base64>${arg.value}</base64>`;
                }
                default: {
                    return `<struct>${
                        Object.entries(arg).map(([name, value]) =>
                            `<member><name>${name}</name><value>${serialize(value)}</value></member>`
                        ).join('')
                    }</struct>`;
                }
            }
        }
        default: {
            throw new Error(`Unable to serialize type "${type}"`);
        }
    }
};

/** Deserialize XML-RPC. */
// deno-lint-ignore no-explicit-any
export const deserialize = <T>(value: any): T => {
    if (typeof value === 'object') {
        if ('xml' in value) {
            delete value.xml;
            return value as T;
        }
        if ('value' in value && 'name' in value) {
            const [type, val] = Object.entries(value['value']).at(0) as [string, unknown];
            switch (type) {
                case 'int':
                case 'i4':
                case 'double':
                    value[value.name] = Number(val);
                    break;
                default:
                    value[value.name] = val;
                    break;
            }
            delete value.name;
            delete value.value;
            return value as T;
        }
        if ('array' in value) {
            return deserialize(value.array);
        }
        if ('data' in value) {
            return deserialize(value.data);
        }
        if ('value' in value) {
            return deserialize(value.value);
        }
        if ('struct' in value) {
            return deserialize(value.struct);
        }
        if ('member' in value) {
            return Object.assign(Object.create(null), ...deserialize(value.member) as T[]);
        }
        for (const [key, prop] of Object.entries(value)) {
            value[key] = deserialize(prop);
        }
    }
    return value as T;
};
