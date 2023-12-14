// Copyright (c) 2023, NeKz
// SPDX-License-Identifier: MIT

import { assert, assertEquals } from 'std/assert/mod.ts';
import { Frame, Label, ManiaLink, Quad, render } from 'mlx';

Deno.test('SSR', () => {
    // deno-fmt-ignore
    function App() {
      const foo = 2 + 2;

      return (
      <>
          <ManiaLink version='3'>
          <Label text='text'>{foo}</Label>
            <Frame pos='10 10' z-index='0'>
              <Quad size='10 10' bgcolor='F00A'>
                lol
              </Quad>
              <Quad pos='-10 0' zIndex='0' size='10 10' bgcolor='00FA' />
            </Frame>
          </ManiaLink>
        </>
      );
    }

    const xml = render(<App />, undefined, { pretty: '  ' });

    assert(xml);

    assertEquals(
        xml,
        `<?xml version="1.0" encoding="utf-8" standalone="yes" ?>
<manialink version="3">
  <label text="text">4</label>
  <frame
    pos="10 10"
    z-index="0"
  >
    <quad
      size="10 10"
      bgcolor="F00A"
    >
      lol
    </quad>
    <quad
      pos="-10 0"
      size="10 10"
      bgcolor="00FA"
      z-index="0"
     />
  </frame>
</manialink>`,
    );
});
