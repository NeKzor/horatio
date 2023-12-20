// Copyright (c) 2023, NeKz
// SPDX-License-Identifier: MIT

import 'std/dotenv/load.ts';
import { Remote } from './remote/mod.ts';
import { installListener } from './listener.ts';

const remote = new Remote(Deno.env.get('RPC_HOST')!, Number(Deno.env.get('RPC_PORT')!));

try {
    // TODO: Reconnect logic
    await remote.connect();

    await remote.Authenticate(Deno.env.get('RPC_USER')!, Deno.env.get('RPC_PASS')!);

    installListener(remote);

    await remote.SetApiVersion('2023-04-24');
    await remote.EnableCallbacks(true);
    await remote.TriggerModeScriptEventArray('XmlRpc.EnableCallbacks', ['true']);

    // const [mapList, systemInfo] = await remote.multiCall((call) => [
    //     call.GetMapList(-1, 0),
    //     call.GetSystemInfo(),
    // ]);

    // console.log({ mapList, systemInfo });

    setTimeout(async () => await remote.NextMap(), 1_000);
} catch (err) {
    console.error(err, JSON.stringify(err.cause));
}
