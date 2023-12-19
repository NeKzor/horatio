// Copyright (c) 2023, NeKz
// SPDX-License-Identifier: MIT

import 'std/dotenv/load.ts';
import { Remote } from './remote/mod.ts';

using remote = new Remote(Deno.env.get('RPC_HOST')!, Number(Deno.env.get('RPC_PORT')!));

try {
    await remote.connect();

    await remote.Authenticate(Deno.env.get('RPC_USER')!, Deno.env.get('RPC_PASS')!);

    // TODO
    // remote.on('callback', (...args: unknown[]) => {
    //     console.log({ args });
    // });

    await remote.SetApiVersion('2023-04-24');
    await remote.EnableCallbacks(true);
    await remote.TriggerModeScriptEventArray('XmlRpc.EnableCallbacks', ['true']);

    const [mapList, systemInfo] = await remote.multiCall((call) => [
        call.GetMapList(-1, 0),
        call.GetSystemInfo(),
    ]);

    console.log({ mapList, systemInfo });
} catch (err) {
    console.error(err);
}
