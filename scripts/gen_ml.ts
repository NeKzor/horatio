// Copyright (c) 2023, NeKz
// SPDX-License-Identifier: MIT

// Sources:
// https://doc.maniaplanet.com/manialink/references/actions-in-manialink
// https://doc.maniaplanet.com/manialink/references/manialink-styles

const styles = JSON.parse(Deno.readTextFileSync('./styles.json'));

console.log(`// Copyright (c) 2023, NeKz
// SPDX-License-Identifier: MIT

export type MLActionStation =
    | 'enter'
    | 'home'
    | 'clear_station'
    | 'menu_solo'
    | 'menu_competitions'
    | 'menu_local'
    | 'menu_internet'
    | 'menu_editors'
    | 'menu_profile'
    | 'menu_main'
    | 'menu_group';
export type MLActionTitle =
    | 'quit'
    | '0'
    | 'back'
    | 'home'
    | 'menu_solo'
    | 'menu_competitions'
    | 'menu_local'
    | 'menu_internet'
    | 'menu_editors'
    | 'menu_profile'
    | 'menu_main'
    | 'menu_group';
export type MLActionBrowser =
    | 'quit'
    | '0'
    | 'home'
    | 'back';
export type MLActionGame =
    | 'maniaplanet:quitserver'
    | 'maniaplanet:savereplay'
    | 'maniaplanet:togglespec'
    | string;
export type ManiaLinkActions = MLActionStation | MLActionTitle | MLActionBrowser | MLActionGame;
`);

const elems = new Map<string, string[]>();

for (const style of styles) {
    let elem = style.elements.at(0).at(0).toUpperCase() + style.elements.at(0).slice(1);
    let styl = '';
    const obj: string[] = [];
    if (style.styles) {
        styl = style.styles.at(0).at(0).toUpperCase() + style.styles.at(0).slice(1);
        if (style.substyles) {
            for (const [_key, value] of Object.entries({ ...style, elements: undefined })) {
                if (!value) {
                    continue;
                }
                obj.push(`style?: '${styl}';`);
                break;
            }
        }
    }
    if (elem === 'Manialink') {
        elem = 'ManiaLink';
    }
    for (
        const [key, value] of Object.entries({
            ...style,
            [style.substyles?.length ? 'styles' : '']: undefined,
            elements: undefined,
        })
    ) {
        if (!value) {
            continue;
        }
        const name = `MLStyle${elem}${styl}${key.at(0)?.toUpperCase() + key.slice(1)}`;
        obj.push(`${key.slice(0, -1)}?: ${name};`);
        console.log(`export type ${name} = |`);
        // deno-lint-ignore no-explicit-any
        const values = value as any[];
        values.forEach((value, idx) => {
            console.log(
                `    '${value.at(0)?.toUpperCase() + value.slice(1)}${idx !== values.length - 1 ? '\' |' : '\';'}`,
            );
        });
        break;
    }
    console.log(`export type MLStyle${elem}${styl} = { ${obj.join(' ')} };`);
    const e = elems.get(elem);
    if (e) {
        e.push(`MLStyle${elem}${styl}`);
    } else {
        elems.set(elem, [`MLStyle${elem}${styl}`]);
    }
}

for (const [key, values] of elems.entries()) {
    console.log(`export type MLStyle${key}s = ${values.join(' | ')};`);
}
