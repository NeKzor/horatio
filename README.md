[![Deno CI](https://github.com/NeKzor/horatio/actions/workflows/deno.yml/badge.svg)](https://github.com/NeKzor/horatio/actions/workflows/deno.yml)

# Horatio

Minimalistic server controller for Trackmania.

## Goals

- Minimal abstraction
- ManiaLinks via MLX
- Type safety
- Security
- Simple setup with Docker
- Detailed documentation

## Comparison

|                        | Horatio<sup>1</sup>   | EvoSC-sharp<sup>1</sup> | EvoSC               | PyPlanet            | ManiaControl               |
| ---------------------- | --------------------- | ----------------------- | ------------------- | ------------------- | -------------------------- |
| Language               | TypeScript            | C#                      | PHP                 | Python              | PHP                        |
| Runtime                | Deno                  | .NET 8.0                | Zend Engine         | Python3             | Zend Engine                |
| Start Year             | 2023                  | 2021                    | 2018                | 2017                | 2014                       |
| Game Support           | TM                    | TM                      | TM, TM2             | TM, TM2, SM         | TM, TM2, SM                |
| ManiaLinks             | MLX                   | ManiaTemplates          | Latte               | Jinja               | FML                        |
| Line Count<sup>2</sup> | \< 10'000             | 25'474                  | 15,299              | 26'342              | 41'343                     |
| Docker                 | -                     | -                       | Yes                 | Yes                 | No                         |
| Website                | [horatio.land][h-www] | [evosc.io][e2-www]      | -                   | [pypla.net][pp-www] | [maniacontrol.com][mc-www] |
| Documentation          | [Yes][h-docs]         | [Yes][e2-docs]          | [Yes][e1-docs]      | [Yes][pp-docs]      | [Yes][mc-docs]             |
| Source Code            | [GitHub][h-source]    | [GitHub][e2-source]     | [GitHub][e1-source] | [GitHub][pp-source] | [GitHub][mc-source]        |

<sup>1</sup> In development.

<sup>2</sup> Counting main language extension code lines using tokei.

[h-www]: https://horatio.land
[e2-www]: https://evosc.io
[pp-www]: https://pypla.net
[mc-www]: https://maniacontrol.com
[h-docs]: https://horatio.land/docs/intro
[e2-docs]: https://evosc.io/development/core
[e1-docs]: https://github.com/EvoEsports/EvoSC/wiki/Installation
[pp-docs]: https://pypla.net
[mc-docs]: https://maniacontrol.com/docs
[h-source]: https://github.com/NeKzor/horatio
[e2-source]: https://github.com/EvoEsports/EvoSC
[e1-source]: https://github.com/EvoEsports/EvoSC-sharp
[pp-source]: https://github.com/PyPlanet/PyPlanet
[mc-source]: https://github.com/ManiaControl/ManiaControl

## License

[MIT License](./LICENSE)
