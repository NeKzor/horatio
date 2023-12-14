// Copyright (c) 2023, NeKz
// SPDX-License-Identifier: MIT

// This is the custom MLX runtime which transforms JSX to ManiaLinks.
// It's basically just Preact lol.

import * as preact from 'preact/jsx-runtime';
import { ComponentType, PreactDOMAttributes, VNode } from 'preact/src/index.js';
import preactRender from 'preact-render-to-string/jsx';
import { ManiaLinkActions, MLStyleLabels, MLStyleManiaLinks, MLStyleQuads } from './ml.ts';

export type ComponentProps<
    // deno-lint-ignore no-explicit-any
    C extends ComponentType<any> | keyof JSX.IntrinsicElements,
> = C extends ComponentType<infer P> ? P
    : C extends keyof JSX.IntrinsicElements ? JSX.IntrinsicElements[C]
    : never;

export type MLManialinkElement = PreactDOMAttributes & {
    version?: string;
} & MLStyleManiaLinks;
export type MLFrameElement = {
    pos?: string;
    zIndex?: string;
};
export type MLFramemodelElement = PreactDOMAttributes & {
    id?: string;
};
export type MLFrameinstanceElement = {
    modelid?: string;
    id?: string;
    pos?: string;
    zIndex?: string;
    valign?: string;
    halgin?: string;
};
export type MLQuadElement = {
    pos?: string;
    zIndex?: string;
    size?: string;
    bgcolor?: string;
    image?: string;
} & MLStyleQuads;
export type MLLabelElement = {
    text?: string;
    textcolor?: string;
    id?: string;
    pos?: string;
    zIndex?: string;
    size?: string;
    valign?: string;
    halign?: string;
    bgcolor?: string;
    scriptevents?: string;
    action?: ManiaLinkActions;
} & MLStyleLabels;
export type MLAudioElement = {
    data?: string;
    play?: string;
    looping?: string;
};
export type MLMusicElement = {
    data?: string;
};
export type MLIncludeElement = {
    url?: string;
};

export declare namespace JSX {
    interface IntrinsicElements {
        manialink: MLManialinkElement;
        frame: MLFrameElement;
        framemodel: MLFramemodelElement;
        frameinstance: MLFrameinstanceElement;
        quad: MLQuadElement;
        label: MLLabelElement;
        audio: MLAudioElement;
        music: MLMusicElement;
        include: MLIncludeElement;
    }
}

// deno-lint-ignore no-explicit-any
export function jsx(type: any, props: any, key: any) {
    //console.log(type, props, key, source, self);
    // Rename MLX attributes to valid ManiaLinks attributes.
    if (typeof type === 'string') {
        switch (type) {
            case 'frame':
            case 'frameinstance':
            case 'quad':
            case 'label': {
                if ('zIndex' in props) {
                    props['z-index'] = props['zIndex'];
                    delete props['zIndex'];
                }
            }
        }
    }
    return preact.jsx(type, props, key);
}

export const jsxTemplate = preact.jsxTemplate;
export const jsxEscape = preact.jsxEscape;
export const Fragment = preact.Fragment;
export const jsxs = preact.jsxs;

interface Options {
    jsx?: boolean;
    xml?: boolean;
    pretty?: boolean | string;
    shallow?: boolean;
    functions?: boolean;
    functionNames?: boolean;
    skipFalseAttributes?: boolean;
}

// deno-lint-ignore no-explicit-any
export function render(node: VNode, context?: any, options?: Options): string {
    const str = preactRender(node, context, { xml: true, ...(options ?? {}) });
    return '<?xml version="1.0" encoding="utf-8" standalone="yes" ?>' + (options?.pretty ? '\n' : '') + str;
}
