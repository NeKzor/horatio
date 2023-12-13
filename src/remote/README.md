# Remote

Convenient wrapper around the npm module `@evotm/gbxclient` for type-safety.

## Usage

### Connect and authenticate

```ts
import { GbxClient } from 'npm:@evotm/gbxclient@1.4.1';
import { Remote } from 'npm:@nekz/gbx-remote@0.1.0';

const remote = new Remote(new GbxClient());

await remote.client.connect('127.0.0.1.', 5_000);
await remote.Authenticate('SuperAdmin', password);
```

### Call methods

```ts
await remote.SetApiVersion('2023-04-24');

await remote.EnableCallbacks(true);

await remote.TriggerModeScriptEventArray(
    'XmlRpc.EnableCallbacks',
    ['true'],
);
```

### Call multiple methods at once

```ts
const [
    mapList,
    systemInfo,
] = await remote.multiCall(async (call) => [
    await call.GetMapList(-1, 0),
    await call.GetSystemInfo(),
]);
```
