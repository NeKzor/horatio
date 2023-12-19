# Remote

Type-safe GBX-Remote 2 compatible client.

## Usage

### Connect and authenticate

```ts
import { Remote } from 'npm:@nekz/gbx-remote@0.1.0';

using remote = new Remote('127.0.0.1.', 5_000);

await remote.connect();
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
] = await remote.multiCall((call) => [
    call.GetMapList(-1, 0),
    call.GetSystemInfo(),
]);
```
