// Copyright (c) 2023, NeKz
// SPDX-License-Identifier: MIT

import 'https://deno.land/std@0.208.0/dotenv/load.ts';
import { GbxClient } from 'npm:@evotm/gbxclient@1.4.1';
import Events from 'node:events';
import { Remote } from './remote/mod.ts';

const remote = new Remote(new GbxClient());
await remote.client.connect(Deno.env.get('RPC_HOST')!, Number(Deno.env.get('RPC_PORT')!));
await remote.Authenticate(Deno.env.get('RPC_USER')!, Deno.env.get('RPC_PASS')!);

(remote.client as Events).on('callback', (...args: unknown[]) => {
    console.log({ args });
});

await remote.SetApiVersion('2023-04-24');
await remote.EnableCallbacks(true);
await remote.TriggerModeScriptEventArray('XmlRpc.EnableCallbacks', ['true']);

const [_mapList, systemInfo] = await remote.multiCall(async (call) => [
    await call.GetMapList(-1, 0),
    await call.GetSystemInfo(),
]);

console.log({ systemInfo });

await remote.client.disconnect();
