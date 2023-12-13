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

|               | Horatio<sup>1</sup>              | EvoSC-sharp<sup>1</sup>        | EvoSC                | PyPlanet                      | ManiaControl                             |
| ------------- | -------------------------------- | ------------------------------ | -------------------- | ----------------------------- | ---------------------------------------- |
| Language      | TypeScript                       | C#                             | PHP                  | Python                        | PHP                                      |
| Runtime       | Deno                             | .NET 8.0                       | Zend Engine          | Python3                       | Zend Engine                              |
| Start Year    | 2023                             | 2021                           | 2018                 | 2017                          | 2014                                     |
| Game Support  | TM                               | TM                             | TM, TM2              | TM, TM2, SM                   | TM, TM2, SM                              |
| ManiaLinks    | MLX                              | ManiaTemplates                 | Latte                | Jinja                         | FML                                      |
| Docker        | -                                | -                              | Yes                  | Yes                           | No                                       |
| Website       | [horatio.land][horation-website] | [evosc.io][evoscsharp-website] | -                    | [pypla.net][pyplanet-website] | [maniacontrol.com][maniacontrol-website] |
| Documentation | [Yes][horation-docs]             | [Yes][evoscsharp-docs]         | [Yes][evosc-docs]    | [Yes][pyplanet-docs]          | [Yes][maniacontrol-docs]                 |
| Source Code   | [GitHub][horation-docs]          | [GitHub][evoscsharp-docs]      | [GitHub][evosc-docs] | [GitHub][pyplanet-docs]       | [GitHub][maniacontrol-docs]              |

<sup>1</sup> In development

[horation-website]: https://horatio.land
[evoscsharp-website]: https://evosc.io
[pyplanet-website]: https://pypla.net
[maniacontrol-website]: https://maniacontrol.com
[horation-docs]: https://horatio.land/docs/intro
[evoscsharp-docs]: https://evosc.io/development/core
[evosc-docs]: https://github.com/EvoEsports/EvoSC/wiki/Installation
[pyplanet-docs]: https://pypla.net
[maniacontrol-docs]: https://maniacontrol.com/docs
[horation-source]: https://github.com/NeKzor/horatio
[evoscsharp-source]: https://github.com/EvoEsports/EvoSC
[evosc-source]: https://github.com/EvoEsports/EvoSC-sharp
[pyplanet-source]: https://github.com/PyPlanet/PyPlanet
[maniacontrol-source]: https://github.com/ManiaControl/ManiaControl

## License

[MIT License](./LICENSE)
