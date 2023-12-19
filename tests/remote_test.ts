// Copyright (c) 2023, NeKz
// SPDX-License-Identifier: MIT

import 'std/dotenv/load.ts';
import { Remote } from '../src/remote/mod.ts';
import { assert } from 'std/assert/mod.ts';
import { expect } from 'std/expect/mod.ts';
import { describe, it } from 'std/testing/bdd.ts';

const remote = new Remote(Deno.env.get('RPC_HOST')!, Number(Deno.env.get('RPC_PORT')!));
await remote.connect();

describe('Remote', () => {
    it('Authenticate rejected', async () => {
        try {
            await remote.Authenticate('fault', 'test');
        } catch (e) {
            expect(e.cause, 'call to Authenticate() with fault').toMatchObject(
                {
                    value: {
                        struct: {
                            member: [
                                {
                                    name: 'faultCode',
                                    value: {
                                        int: '-1000',
                                    },
                                },
                                {
                                    name: 'faultString',
                                    value: {
                                        string: 'User unknown.',
                                    },
                                },
                            ],
                        },
                    },
                },
            );
        }
    });

    it('Authenticate', async () => {
        const result = await remote.Authenticate(Deno.env.get('RPC_USER')!, Deno.env.get('RPC_PASS')!);
        expect(result, 'call to Authenticate()').toBe(true);
    });

    it('Single calls', async () => {
        let result = await remote.SetApiVersion('2023-04-24');
        expect(result, 'SetApiVersion()').toBe(true);

        result = await remote.EnableCallbacks(true);
        expect(result, 'EnableCallbacks()').toBe(true);

        result = await remote.TriggerModeScriptEventArray('XmlRpc.EnableCallbacks', ['true']);
        expect(result, 'TriggerModeScriptEventArray()').toBe(true);
    });

    it('Multiple calls', async () => {
        const result = await remote.multiCall(async (call) => [
            await call.GetMapList(-1, 0),
            await call.GetSystemInfo(),
        ]);

        assert(result, 'multiCall()');

        const [mapList, systemInfo] = result;

        assert(Array.isArray(mapList));
        expect(mapList.length).toBe(5);

        const map = mapList.at(0);
        assert(map);

        expect(map.UId).toBe('CMbUs4OzcDEwUcUUfOonUk4bit8');
        expect(map.Name).toBe('Fall 2023 - 01');
        expect(map.FileName).toBe('Campaigns/CurrentQuarterly/Fall 2023 - 01.Map.Gbx');
        expect(map.Environnement).toBe('Stadium');
        expect(map.Author).toBe('Nadeo');
        expect(map.AuthorNickname).toBe('');
        expect(map.GoldTime).toBe(26000);
        expect(map.CopperPrice).toBe(4039);
        expect(map.MapType).toBe('TrackMania\\TM_Race');
        expect(map.MapStyle).toBe('');

        assert(systemInfo);

        expect(systemInfo.PublishedIp).toBe('127.0.0.1');
        expect(systemInfo.Port).toBe(2_350);
        expect(systemInfo.P2PPort).toBe(0);
        expect(systemInfo.TitleId).toBe('Trackmania');
        expect(systemInfo.ServerLogin).toBe('fLv-F-6yTYGlKGIPsd2RtQ');
        expect(systemInfo.ServerPlayerId).toBe(0);
        expect(systemInfo.ConnectionDownloadRate).toBe(102_400);
        expect(systemInfo.ConnectionUploadRate).toBe(102_400);
        expect(systemInfo.IsServer).toBe(true);
        expect(systemInfo.IsDedicated).toBe(true);
    });
});
