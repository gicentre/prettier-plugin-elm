# prettier-plugin-elm

## 1.0.0

_Released on 2026-11-05_

### Major Changes

- [#82](https://github.com/gicentre/prettier-plugin-elm/pull/82) [`82d5f36`](https://github.com/gicentre/prettier-plugin-elm/commit/82d5f3656ff1e62a6d59be1c2a3c68f18feace0b) - Set minimum Node version to 22.12.0. Version 0.12.0 declared support for Node 18.20.6 but could not be loaded below Node 20.19 because of an ESM-only dependency.

  This is also the first stable release. The plugin has been stable for years, so staying on `0.x` no longer gave us any benefit. Apart from this and the changes below, it works the same as `0.12.0`. From now on, breaking changes such as dropping a Node.js or Prettier version are major releases, and `elm-format` updates, which may change how code is formatted, are minor releases.

### Patch Changes

- [#81](https://github.com/gicentre/prettier-plugin-elm/pull/81) [`aecfa10`](https://github.com/gicentre/prettier-plugin-elm/commit/aecfa104c074a5bbdb098a062323c87319f6a717) Thanks [@ChristopherPtak](https://github.com/ChristopherPtak)! - Fix missing properties in errors retrieved from the cache, so that `elm-format` failures are no longer reported as an empty `Error`

- [#84](https://github.com/gicentre/prettier-plugin-elm/pull/84) [`a20a2a0`](https://github.com/gicentre/prettier-plugin-elm/commit/a20a2a06b5aa20b64260b0ad4ef68701e4d6659b) - [internal] Switch to changesets and publish with npm provenance

- [#83](https://github.com/gicentre/prettier-plugin-elm/pull/83) [`34b3d9f`](https://github.com/gicentre/prettier-plugin-elm/commit/34b3d9fed9aca6fa558a642c4b78347c22647d9e) - Update production dependencies and remove `temp-dir`. The cache location stays the same.

## 0.12.0

_Released on 2025-09-21_

- [#64](https://github.com/gicentre/prettier-plugin-elm/pull/64) [`6ccc62d`](https://github.com/gicentre/prettier-plugin-elm/commit/6ccc62df0b881b226399b0110cb77db370548e2b) - **[breaking change]** Set minimum Node version to 18.20.6

- [#63](https://github.com/gicentre/prettier-plugin-elm/pull/63) [`d5a67d8`](https://github.com/gicentre/prettier-plugin-elm/commit/d5a67d89bef7b7ea811ff3ae2e01df9eafcb88ee) - Update elm-format to 0.8.8

- [#64](https://github.com/gicentre/prettier-plugin-elm/pull/64) [`6ccc62d`](https://github.com/gicentre/prettier-plugin-elm/commit/6ccc62df0b881b226399b0110cb77db370548e2b), [#60](https://github.com/gicentre/prettier-plugin-elm/pull/60) [`95fa349`](https://github.com/gicentre/prettier-plugin-elm/commit/95fa3499eaa5152819117ee4592c5f38dc50a253) - Update production dependencies and devDependencies

- [#59](https://github.com/gicentre/prettier-plugin-elm/pull/59) [`e397cef`](https://github.com/gicentre/prettier-plugin-elm/commit/e397cefeba3044563e6800507b1d4f79eadafce8) - [internal] Switch from yarn to pnpm

- [#60](https://github.com/gicentre/prettier-plugin-elm/pull/60) [`95fa349`](https://github.com/gicentre/prettier-plugin-elm/commit/95fa3499eaa5152819117ee4592c5f38dc50a253) - [internal] Switch from jest to vitest

## 0.11.0

_Released on 2023-04-18_

- [#47](https://github.com/gicentre/prettier-plugin-elm/pull/47) [`62c03c7`](https://github.com/gicentre/prettier-plugin-elm/commit/62c03c74e9260c7264271c65ae4577c99082d353) - Update elm-format to 0.8.7

- [#46](https://github.com/gicentre/prettier-plugin-elm/pull/46) [`60980a2`](https://github.com/gicentre/prettier-plugin-elm/commit/60980a248c949b52ec453a27d9a862b8c9c12463) - Update and pin `devDependencies`

## 0.10.0

_Released on 2023-03-02_

- [#43](https://github.com/gicentre/prettier-plugin-elm/pull/43) [`e1f5e4f`](https://github.com/gicentre/prettier-plugin-elm/commit/e1f5e4fa9842aa33d2d583c756b764b2e381f88d) - Update elm-format to 0.8.6

- [#44](https://github.com/gicentre/prettier-plugin-elm/pull/44) [`1571ad0`](https://github.com/gicentre/prettier-plugin-elm/commit/1571ad0b66900df5ac576f2e4ae0ca23560ae28b) - Update devDependencies and Yarn

## 0.9.0

_Released on 2022-11-05_

- [#33](https://github.com/gicentre/prettier-plugin-elm/pull/33) [`63a4cf5`](https://github.com/gicentre/prettier-plugin-elm/commit/63a4cf561d4020a2e11e522415672e479486c36e) - **[breaking change]** Set minimum Node version to 14

- [#36](https://github.com/gicentre/prettier-plugin-elm/pull/36) [`49983c5`](https://github.com/gicentre/prettier-plugin-elm/commit/49983c548c66310d87aec0c6b2cabee4324d2b1d) - Test plugin against Prettier v1, v2 and v3, use 3.0.0-alpha.4 internally

- [#39](https://github.com/gicentre/prettier-plugin-elm/pull/39) [`0780588`](https://github.com/gicentre/prettier-plugin-elm/commit/0780588ad1a5fd7d083349382dd7a2269b3725ed) - Add timeout when calling `elm-format`

- [#31](https://github.com/gicentre/prettier-plugin-elm/pull/31) [`522e091`](https://github.com/gicentre/prettier-plugin-elm/commit/522e091f3297bd05302cec5c686856881b9d0755), [#32](https://github.com/gicentre/prettier-plugin-elm/pull/32) [`d69deaf`](https://github.com/gicentre/prettier-plugin-elm/commit/d69deafbda9345c5f9d5c7a4c5c461169193f2b5), [#34](https://github.com/gicentre/prettier-plugin-elm/pull/34) [`dc7ac66`](https://github.com/gicentre/prettier-plugin-elm/commit/dc7ac663d11f81fe828930c44b15424df1ba67a2), [#35](https://github.com/gicentre/prettier-plugin-elm/pull/35) [`88e7385`](https://github.com/gicentre/prettier-plugin-elm/commit/88e7385ddc75c3dca0409533fe9623e3295a297f), [#37](https://github.com/gicentre/prettier-plugin-elm/pull/37) [`e1ebaa0`](https://github.com/gicentre/prettier-plugin-elm/commit/e1ebaa08eb6fe924a4696381dae61abc40387c5d), [#38](https://github.com/gicentre/prettier-plugin-elm/pull/38) [`c102a86`](https://github.com/gicentre/prettier-plugin-elm/commit/c102a86f7e286aff7cdd5fbdd0a9b8c90d3b4d66) - Update dependencies and refactor codebase

## 0.8.0

_Released on 2021-08-24_

- [#23](https://github.com/gicentre/prettier-plugin-elm/pull/23) [`10940bd`](https://github.com/gicentre/prettier-plugin-elm/commit/10940bd40609e15cf6fdf8c539db26abd70de9b5) - Upgrade dependencies (includes `elm-format` `0.8.3` → `0.8.5`)

- [#24](https://github.com/gicentre/prettier-plugin-elm/pull/24) [`d688cec`](https://github.com/gicentre/prettier-plugin-elm/commit/d688cec27ec420b53a3a7a066cc037b4e8b37bf9) - Replace TSLint with ESLint

- [#25](https://github.com/gicentre/prettier-plugin-elm/pull/25) [`59f31df`](https://github.com/gicentre/prettier-plugin-elm/commit/59f31dfb77ffbca9e64ed3d8b15649859b73b875) - **[breaking change]** Set minimum Node version to 12

## 0.7.0

_Released on 2020-03-28_

- Pin `elm-format` to `0.8.3`

- Use Prettier v2 in CI (v1 should be still supported)

- Upgrade dependencies

- Switch to Github Actions (drop Azure DepOps CI/CD)

## 0.6.0

_Released on 2020-01-13_

- **[breaking change]** Drop Node 8 support due to its end of life on 2019-12-31

- Upgrade dependencies

- Pin `elm-format` dependency to `0.8.2` instead of relying on `^0.8.2` (this can improve predictability of the plugin behaviour in future)

## 0.5.0

_Released on 2019-07-21_

- **[breaking change]** Drop Node 6 support due to its end of life on 2019-04-30

- Upgrade dependencies

## 0.4.2

_Released on 2018-12-22_

- [#8](https://github.com/gicentre/prettier-plugin-elm/pull/8) [`bbf66dc`](https://github.com/gicentre/prettier-plugin-elm/commit/bbf66dc2764ce5d2b89453420ff9745333537510) - Refactor the plugin using TypeScript and thus possibly improve stability in a couple of rare edge cases

- [`e518299`](https://github.com/gicentre/prettier-plugin-elm/commit/e518299c4114a4251f71ead87ed49eeb60c5f79c), [#9](https://github.com/gicentre/prettier-plugin-elm/pull/9) [`4b794c9`](https://github.com/gicentre/prettier-plugin-elm/commit/4b794c995a1b496cba3df24c0ef5c2b2a26e27e2), [`0e68c6e`](https://github.com/gicentre/prettier-plugin-elm/commit/0e68c6eb674b7da999351cc734e8dd545be67013) - Set up Azure Pipelines, remove Travis, AppVeyor and Code Climate integrations

- [`0aea2ea`](https://github.com/gicentre/prettier-plugin-elm/commit/0aea2ea6b6c17d02100ea2a71b430deea1247cfd), [`ff1411f`](https://github.com/gicentre/prettier-plugin-elm/commit/ff1411f952a4edb319d043f7aa3af59bb1875117) - Remove `prettier` from `peerDependencies` to fix a warning when installing the plugin globally

- [`a36e001`](https://github.com/gicentre/prettier-plugin-elm/commit/a36e0017f9759bf667c2a88b4e4dedb38f684806) - Upgrade dependencies

- [`be2676b`](https://github.com/gicentre/prettier-plugin-elm/commit/be2676b7ba54856e35e4a32b89bb7975623c7d24) - Reflect recent changes in README.md

## 0.4.1

_Released on 2018-10-14_

- [#6](https://github.com/gicentre/prettier-plugin-elm/pull/6) [`495acb1`](https://github.com/gicentre/prettier-plugin-elm/commit/495acb14aa2e73aa80024dcdb136d2af57c23c29) - Fix exception in `getElmFormatVersion()` when no global `elm-format` is installed

## 0.4.0

_Released on 2018-10-13_

- [#4](https://github.com/gicentre/prettier-plugin-elm/pull/4) [`3717802`](https://github.com/gicentre/prettier-plugin-elm/commit/3717802328aba9f8514c34756191227ed0bf022e) - Upgrade `elm-format` to `0.8.1` to support Elm `0.19`

  This includes replacing `module Main exposing (..)` with `module Main exposing (something)` in tests, according to the new output in `elm-format`.

  To support formatting of Elm code in markdown blocks, `prettier-plugin-elm` passes `--elm-version=0.19` to `elm-format`. If you use Elm `0.18`, please install `prettier-plugin-elm@0.3`.

- [#5](https://github.com/gicentre/prettier-plugin-elm/pull/5) [`15c1f23`](https://github.com/gicentre/prettier-plugin-elm/commit/15c1f23013ca1318687778ab4e9efeb0451828d1) - Stop running tests in Node 9 due to its end of life on 2018-06-30

- Internal:
  - Upgrade dependencies
  - Add pre-push git hook via [`husky`](https://github.com/typicode/husky) to avoid dumb linting errors in CI

## 0.3.0

_Released on 2018-05-23_

- [#3](https://github.com/gicentre/prettier-plugin-elm/pull/3) [`47f9005`](https://github.com/gicentre/prettier-plugin-elm/commit/47f900550ddd78dda70681818be4642946484237) - Implement caching mechanism to speed-up formatting of Elm blocks in markdown files

- [#2](https://github.com/gicentre/prettier-plugin-elm/pull/2) [`1a15233`](https://github.com/gicentre/prettier-plugin-elm/commit/1a15233d580a68d49dbf1ab4455863e0f9cc74dc) Thanks [@duailibe](https://github.com/duailibe)! - Simplify `locStart()` and `locEnd()`

- Configure automatic testing on Windows using [AppVeyor](https://appveyor.com/).

## 0.2.2 & 0.2.1 & 0.2.0

_Released on 2018-04-12_

- Switch to `elm-format@0.7.0-exp`

- [#1](https://github.com/gicentre/prettier-plugin-elm/issues/1) - Use correct instance of `elm-format` when globally installed with npm

- Fix ` ```markdown ` syntax highlighting on GitHub and NPM

## 0.1.0

_Released on 2018-03-16_

Minimal working solution that uses `elm-format@0.6.1-alpha`.
