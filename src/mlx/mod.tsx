// Copyright (c) 2023, NeKz
// SPDX-License-Identifier: MIT

import { type ComponentProps, MLFrameElement, render } from 'mlx/jsx-runtime';

export { render };

export function ManiaLink({ children, ...props }: ComponentProps<'manialink'>) {
    return <manialink {...props}>{children}</manialink>;
}
export function Frame(props: Omit<ComponentProps<'frame'>, 'children'>): MLFrameElement {
    return <frame {...props} />;
}
export function FrameModel({ children, ...props }: ComponentProps<'framemodel'>) {
    return <framemodel {...props}>{children}</framemodel>;
}
export function FrameInstance(props: Omit<ComponentProps<'frameinstance'>, 'children'>) {
    return <frameinstance {...props} />;
}
export function Quad(props: ComponentProps<'quad'> & { children?: never }) {
    return <quad {...props} />;
}
export function Label(props: Omit<ComponentProps<'label'>, 'children'>) {
    return <label {...props} />;
}
export function Audio(props: Omit<ComponentProps<'audio'>, 'children'>) {
    return <audio {...props} />;
}
export function Music(props: Omit<ComponentProps<'music'>, 'children'>) {
    return <music {...props} />;
}
export function Include(props: Omit<ComponentProps<'include'>, 'children'>) {
    return <include {...props} />;
}
