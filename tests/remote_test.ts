// Copyright (c) 2023, NeKz
// SPDX-License-Identifier: MIT

import 'https://deno.land/std@0.208.0/dotenv/load.ts';
import { GbxClient } from 'npm:@evotm/gbxclient@1.4.1';
import { Remote } from '../src/remote/mod.ts';
import { assert, assertEquals } from 'https://deno.land/std@0.208.0/assert/mod.ts';

Deno.test('Remote', async (t) => {
    const remote = new Remote(new GbxClient());

    const result = await remote.client.connect(Deno.env.get('RPC_HOST')!, Number(Deno.env.get('RPC_PORT')!));
    assertEquals(result, true, 'Connected to server');

    await t.step('Authentiate', async () => {
        const result = await remote.Authenticate(Deno.env.get('RPC_USER')!, Deno.env.get('RPC_PASS')!);
        assertEquals(result, true, 'call to Authenticate()');
    });

    await t.step('Call', async () => {
        let res = await remote.SetApiVersion('2023-04-24');
        assert(result, 'SetApiVersion()');

        res = await remote.EnableCallbacks(true);
        assert(result, 'EnableCallbacks()');

        res = await remote.TriggerModeScriptEventArray('XmlRpc.EnableCallbacks', ['true']);
        assert(result, 'TriggerModeScriptEventArray()');
    });

    await t.step('Multicall', async () => {
        const result = await remote.multiCall(async (call) => [
            await call.GetMapList(-1, 0),
            await call.GetSystemInfo(),
        ]);

        assert(result, 'multiCall()');

        const [mapList, systemInfo] = result;

        assert(Array.isArray(mapList));
        assertEquals(mapList.length, 5);

        const [map] = mapList;
        assert(map);
        assert(typeof map === 'object');

        assertEquals(map.UId, 'CMbUs4OzcDEwUcUUfOonUk4bit8');
        assertEquals(map.Name, 'Fall 2023 - 01');
        assertEquals(map.FileName, 'Campaigns/CurrentQuarterly/Fall 2023 - 01.Map.Gbx');
        assertEquals(map.Environnement, 'Stadium');
        assertEquals(map.Author, 'Nadeo');
        assertEquals(map.AuthorNickname, '');
        assertEquals(map.GoldTime, 26000);
        assertEquals(map.CopperPrice, 4039);
        assertEquals(map.MapType, 'TrackMania\\TM_Race');
        assertEquals(map.MapStyle, '');

        assert(systemInfo);
        assert(typeof systemInfo === 'object');

        assertEquals(systemInfo.PublishedIp, '127.0.0.1');
        assertEquals(systemInfo.Port, 2_350);
        assertEquals(systemInfo.P2PPort, 0);
        assertEquals(systemInfo.TitleId, 'Trackmania');
        assertEquals(systemInfo.ServerLogin, 'fLv-F-6yTYGlKGIPsd2RtQ');
        assertEquals(systemInfo.ServerPlayerId, 0);
        assertEquals(systemInfo.ConnectionDownloadRate, 102_400);
        assertEquals(systemInfo.ConnectionUploadRate, 102_400);
        assertEquals(systemInfo.IsServer, true);
        assertEquals(systemInfo.IsDedicated, true);
    });

    await remote.client.disconnect();
});
