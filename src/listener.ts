import type { Remote } from './remote/mod.ts';
import { RpcCallbackMethod, RpcScriptCallbackMethod } from './remote/types.ts';

// deno-lint-ignore no-explicit-any
const inspect = (obj: any) => {
    for (const key of Object.keys(obj)) {
        const value = obj[key];
        if (key === 'string' && value[0] === '{') {
            try {
                obj[key] = JSON.parse(value);
                // deno-lint-ignore no-empty
            } catch {
            }
        }
        if (typeof value === 'object') {
            obj[key] = inspect(value);
        }
    }
    return obj;
};

export const installListener = (remote: Remote) => {
    remote.addEventListener('callback', (event) => {
        console.dir({ detail: inspect(event.detail) }, { depth: 16, strAbbreviateSize: 400 });
        switch (event.detail.methodCall.methodName) {
            case RpcCallbackMethod.ManiaPlanet_BeginMatch:
                break;
            case RpcCallbackMethod.ManiaPlanet_EndMatch:
                break;
            case RpcCallbackMethod.ManiaPlanet_BeginMap:
                break;
            case RpcCallbackMethod.ManiaPlanet_EndMap:
                break;
            case RpcCallbackMethod.ManiaPlanet_ModeScriptCallbackArray:
                switch (event.detail.methodCall.params.param[0].value.string) {
                    case RpcScriptCallbackMethod.Maniaplanet_StartMatch_Start:
                        break;
                    case RpcScriptCallbackMethod.Maniaplanet_StartMatch_End:
                        break;
                    case RpcScriptCallbackMethod.Maniaplanet_LoadingMap_Start:
                        break;
                    case RpcScriptCallbackMethod.Maniaplanet_LoadingMap_End:
                        break;
                    case RpcScriptCallbackMethod.Maniaplanet_StartMap_Start:
                        break;
                    case RpcScriptCallbackMethod.Maniaplanet_StartMap_End:
                        break;
                    case RpcScriptCallbackMethod.Maniaplanet_StartRound_Start:
                        break;
                    case RpcScriptCallbackMethod.Maniaplanet_StartRound_End:
                        break;
                    case RpcScriptCallbackMethod.Maniaplanet_StartTurn_Start:
                        break;
                    case RpcScriptCallbackMethod.Maniaplanet_StartTurn_End:
                        break;
                    case RpcScriptCallbackMethod.Maniaplanet_StartPlayLoop:
                        break;
                    case RpcScriptCallbackMethod.Maniaplanet_EndPlayLoop:
                        break;
                    case RpcScriptCallbackMethod.Maniaplanet_EndTurn_Start:
                        break;
                    case RpcScriptCallbackMethod.Maniaplanet_EndTurn_End:
                        break;
                    case RpcScriptCallbackMethod.Maniaplanet_EndRound_Start:
                        break;
                    case RpcScriptCallbackMethod.Maniaplanet_EndRound_End:
                        break;
                    case RpcScriptCallbackMethod.Maniaplanet_EndMap_Start:
                        break;
                    case RpcScriptCallbackMethod.Maniaplanet_Podium_Start:
                        break;
                    case RpcScriptCallbackMethod.Maniaplanet_Podium_End:
                        break;
                    case RpcScriptCallbackMethod.Maniaplanet_EndMap_End:
                        break;
                    case RpcScriptCallbackMethod.Maniaplanet_UnloadingMap_Start:
                        break;
                    case RpcScriptCallbackMethod.Maniaplanet_UnloadingMap_End:
                        break;
                    case RpcScriptCallbackMethod.Maniaplanet_EndMatch_Start:
                        break;
                    case RpcScriptCallbackMethod.Maniaplanet_EndMatch_End:
                        break;
                    case RpcScriptCallbackMethod.Trackmania_Scores:
                        break;
                    default:
                        console.log('UNKNOWN ModeScriptCallbackArray', event.detail.methodCall);
                }
                break;
            case RpcCallbackMethod.ManiaPlanet_StatusChanged:
                break;
            case RpcCallbackMethod.ManiaPlanet_MapListModified:
                break;
            case RpcCallbackMethod.ManiaPlanet_PlayerDisconnect:
                break;
            default:
                console.log('UNKNOWN CALLBACK', event.detail.methodCall);
        }
    });
};
