// Copyright (c) 2023, NeKz
// SPDX-License-Identifier: MIT

import type { RpcMethod } from './methods.ts';
import type { Remote } from './mod.ts';

export type MultiCall = {
    // deno-lint-ignore no-explicit-any
    [key in RpcMethod]: Remote[key] extends (...args: any) => any
        ? (...params: Parameters<Remote[key]>) => ReturnType<Remote[key]> extends Promise<infer T> ? T : never
        : never;
};

export type RpcMethodResponse = {
    params: {
        param: {
            // deno-lint-ignore no-explicit-any
            value: any;
        };
    };
};

export type RpcFaultResponse = {
    fault: {
        value: {
            struct: {
                member: [
                    { name: 'faultCode'; value: { int: string } },
                    { name: 'faultString'; value: { string: string } },
                ];
            };
        };
    };
};

export type RpcResponse<T = RpcMethodResponse | RpcFaultResponse> = {
    methodResponse: T;
};

export enum RpcCallbackMethod {
    ManiaPlanet_BeginMatch = 'ManiaPlanet.BeginMatch',
    ManiaPlanet_EndMatch = 'ManiaPlanet.EndMatch',
    ManiaPlanet_BeginMap = 'ManiaPlanet.BeginMap',
    ManiaPlanet_EndMap = 'ManiaPlanet.EndMap',
    ManiaPlanet_ModeScriptCallbackArray = 'ManiaPlanet.ModeScriptCallbackArray',
    ManiaPlanet_StatusChanged = 'ManiaPlanet.StatusChanged',
    ManiaPlanet_MapListModified = 'ManiaPlanet.MapListModified',
    ManiaPlanet_PlayerDisconnect = 'ManiaPlanet.PlayerDisconnect',
}

export enum RpcScriptCallbackMethod {
    Maniaplanet_StartMatch_Start = 'Maniaplanet.StartMatch_Start',
    Maniaplanet_StartMatch_End = 'Maniaplanet.StartMatch_End',
    Maniaplanet_LoadingMap_Start = 'Maniaplanet.LoadingMap_Start',
    Maniaplanet_LoadingMap_End = 'Maniaplanet.LoadingMap_End',
    Maniaplanet_StartMap_Start = 'Maniaplanet.StartMap_Start',
    Maniaplanet_StartMap_End = 'Maniaplanet.StartMap_End',
    Maniaplanet_StartRound_Start = 'Maniaplanet.StartRound_Start',
    Maniaplanet_StartRound_End = 'Maniaplanet.StartRound_End',
    Maniaplanet_StartTurn_Start = 'Maniaplanet.StartTurn_Start',
    Maniaplanet_StartTurn_End = 'Maniaplanet.StartTurn_End',
    Maniaplanet_StartPlayLoop = 'Maniaplanet.StartPlayLoop',
    Maniaplanet_EndPlayLoop = 'Maniaplanet.EndPlayLoop',
    Maniaplanet_EndTurn_Start = 'Maniaplanet.EndTurn_Start',
    Maniaplanet_EndTurn_End = 'Maniaplanet.EndTurn_End',
    Maniaplanet_EndRound_Start = 'Maniaplanet.EndRound_Start',
    Maniaplanet_EndRound_End = 'Maniaplanet.EndRound_End',
    Maniaplanet_EndMap_Start = 'Maniaplanet.EndMap_Start',
    Maniaplanet_Podium_Start = 'Maniaplanet.Podium_Start',
    Maniaplanet_Podium_End = 'Maniaplanet.Podium_End',
    Maniaplanet_EndMap_End = 'Maniaplanet.EndMap_End',
    Maniaplanet_UnloadingMap_Start = 'Maniaplanet.UnloadingMap_Start',
    Maniaplanet_UnloadingMap_End = 'Maniaplanet.UnloadingMap_End',
    Maniaplanet_EndMatch_Start = 'Maniaplanet.EndMatch_Start',
    Maniaplanet_EndMatch_End = 'Maniaplanet.EndMatch_End',
    Trackmania_Scores = 'Trackmania.Scores',
}

export type Maniaplanet_Podium_Start_t = {
    time: number;
};

export type RpcMethod_ManiaPlanet_BeginMatch = {
    methodName: RpcCallbackMethod.ManiaPlanet_BeginMatch;
};
export type RpcMethod_ManiaPlanet_EndMatch = {
    methodName: RpcCallbackMethod.ManiaPlanet_EndMatch;
};
export type RpcMethod_ManiaPlanet_BeginMap = {
    methodName: RpcCallbackMethod.ManiaPlanet_BeginMap;
};
export type RpcMethod_ManiaPlanet_EndMap = {
    methodName: RpcCallbackMethod.ManiaPlanet_EndMap;
};
export type RpcMethod_ManiaPlanet_ModeScriptCallbackArray = {
    methodName: RpcCallbackMethod.ManiaPlanet_ModeScriptCallbackArray;
    params: {
        param: [
            {
                value: {
                    string: RpcScriptCallbackMethod;
                };
            },
            {
                value: RpcScriptValue;
            },
        ];
    };
};
export type RpcMethod_ManiaPlanet_StatusChanged = {
    methodName: RpcCallbackMethod.ManiaPlanet_StatusChanged;
};
export type RpcMethod_ManiaPlanet_MapListModified = {
    methodName: RpcCallbackMethod.ManiaPlanet_MapListModified;
};
export type RpcMethod_ManiaPlanet_PlayerDisconnect = {
    methodName: RpcCallbackMethod.ManiaPlanet_PlayerDisconnect;
};

export type RpcCallbackResponse =
    | RpcMethod_ManiaPlanet_BeginMatch
    | RpcMethod_ManiaPlanet_EndMatch
    | RpcMethod_ManiaPlanet_BeginMap
    | RpcMethod_ManiaPlanet_EndMap
    | RpcMethod_ManiaPlanet_ModeScriptCallbackArray
    | RpcMethod_ManiaPlanet_StatusChanged
    | RpcMethod_ManiaPlanet_MapListModified
    | RpcMethod_ManiaPlanet_PlayerDisconnect;

export type RpcScriptMethod_Maniaplanet_StartMatch_Start = {
    value: unknown;
};
export type RpcScriptMethod_Maniaplanet_StartMatch_End = {
    value: unknown;
};
export type RpcScriptMethod_Maniaplanet_LoadingMap_Start = {
    value: unknown;
};
export type RpcScriptMethod_Maniaplanet_LoadingMap_End = {
    value: unknown;
};
export type RpcScriptMethod_Maniaplanet_StartMap_Start = {
    value: unknown;
};
export type RpcScriptMethod_Maniaplanet_StartMap_End = {
    value: unknown;
};
export type RpcScriptMethod_Maniaplanet_StartRound_Start = {
    value: unknown;
};
export type RpcScriptMethod_Maniaplanet_StartRound_End = {
    value: unknown;
};
export type RpcScriptMethod_Maniaplanet_StartTurn_Start = {
    value: unknown;
};
export type RpcScriptMethod_Maniaplanet_StartTurn_End = {
    value: unknown;
};
export type RpcScriptMethod_Maniaplanet_StartPlayLoop = {
    value: unknown;
};
export type RpcScriptMethod_Maniaplanet_EndPlayLoop = {
    value: unknown;
};
export type RpcScriptMethod_Maniaplanet_EndTurn_Start = {
    value: unknown;
};
export type RpcScriptMethod_Maniaplanet_EndTurn_End = {
    value: unknown;
};
export type RpcScriptMethod_Maniaplanet_EndRound_Start = {
    value: unknown;
};
export type RpcScriptMethod_Maniaplanet_EndRound_End = {
    value: unknown;
};
export type RpcScriptMethod_Maniaplanet_EndMap_Start = {
    value: unknown;
};
export type RpcScriptMethod_Maniaplanet_Podium_Start = {
    value: {
        array: {
            data: { value: { string: Maniaplanet_Podium_Start_t } };
        };
    };
};
export type RpcScriptMethod_Maniaplanet_Podium_End = {
    value: unknown;
};
export type RpcScriptMethod_Maniaplanet_EndMap_End = {
    value: unknown;
};
export type RpcScriptMethod_Maniaplanet_UnloadingMap_Start = {
    value: unknown;
};
export type RpcScriptMethod_Maniaplanet_UnloadingMap_End = {
    value: unknown;
};
export type RpcScriptMethod_Maniaplanet_EndMatch_Start = {
    value: unknown;
};
export type RpcScriptMethod_Maniaplanet_EndMatch_End = {
    value: unknown;
};
export type RpcScriptMethod_Trackmania_Scores = {
    value: unknown;
};

export type RpcScriptValue =
    | RpcScriptMethod_Maniaplanet_StartMatch_Start
    | RpcScriptMethod_Maniaplanet_StartMatch_End
    | RpcScriptMethod_Maniaplanet_LoadingMap_Start
    | RpcScriptMethod_Maniaplanet_LoadingMap_End
    | RpcScriptMethod_Maniaplanet_StartMap_Start
    | RpcScriptMethod_Maniaplanet_StartMap_End
    | RpcScriptMethod_Maniaplanet_StartRound_Start
    | RpcScriptMethod_Maniaplanet_StartRound_End
    | RpcScriptMethod_Maniaplanet_StartTurn_Start
    | RpcScriptMethod_Maniaplanet_StartTurn_End
    | RpcScriptMethod_Maniaplanet_StartPlayLoop
    | RpcScriptMethod_Maniaplanet_EndPlayLoop
    | RpcScriptMethod_Maniaplanet_EndTurn_Start
    | RpcScriptMethod_Maniaplanet_EndTurn_End
    | RpcScriptMethod_Maniaplanet_EndRound_Start
    | RpcScriptMethod_Maniaplanet_EndRound_End
    | RpcScriptMethod_Maniaplanet_EndMap_Start
    | RpcScriptMethod_Maniaplanet_Podium_Start
    | RpcScriptMethod_Maniaplanet_Podium_End
    | RpcScriptMethod_Maniaplanet_EndMap_End
    | RpcScriptMethod_Maniaplanet_UnloadingMap_Start
    | RpcScriptMethod_Maniaplanet_UnloadingMap_End
    | RpcScriptMethod_Maniaplanet_EndMatch_Start
    | RpcScriptMethod_Maniaplanet_EndMatch_End
    | RpcScriptMethod_Trackmania_Scores;

export type RpcCall<T = RpcCallbackResponse> = {
    methodCall: T;
};
