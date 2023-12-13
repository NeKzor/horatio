---
sidebar_position: 1
---

# Intro

## Requirements

- [Deno runtime](https://deno.com)
- [Docker engine](https://docs.docker.com/engine/install)

## Setup

- Create and configure env: `cp .env.example .env`
  - `MASTER_LOGIN` - from trackmania.com
  - `MASTER_PASSWORD` - from trackmania.com
  - `RPC_PASS` - generated password e.g. `openssl rand -hex 16`
- Start Docker container
  - `docker compose up -d`

## Tasks

Command prefix: `deno task`

|Task|Description|
|---|---|
|`start`|Starts the server controller.|
|`gen`|Generates src/remote/mod.ts.|
|`docs`|Generates docs/docs/intro/rpc.md.|
|`methods`|Generates methods.json.|
|`ml`|Generates src/mlx/ml.ts.|
|`test`|Runs all unit tests.|
|`build:npm`|Builds npm package.|
|`count`|Print the total line count of the project.|
|`check`|Checks for formatting, linter and type errors.|
|`check:types`|Only checks for type errors.|
