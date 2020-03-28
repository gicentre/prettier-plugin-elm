## 0.7.0 (2020-03-28)

- Pin `elm-format` to `0.8.3`

- Use Prettier v2 in CI (v1 should be still supported)

- Upgrade dependencies

- Switch to Github Actions (drop Azure DepOps CI/CD)

## 0.6.0 (2020-01-13)

- **[breaking change]** Drop Node 8 support due to its end of life on 2019-12-31

- Upgrade dependencies

- Pin `elm-format` dependency to `0.8.2` instead of relying on `^0.8.2` (this can improve predictability of the plugin behaviour in future)

## 0.5.0 (2019-07-21)

- **[breaking change]** Drop Node 6 support due to its end of life on 2019-04-30

- Upgrade dependencies

## 0.4.2 (2018-12-22)

- Refactor the plugin using TypeScript and thus possibly improve stability in a couple of rare edge cases ([#8](https://github.com/gicentre/prettier-plugin-elm/issues/8))

- Set up Azure Pipelines, remove Travis, AppVeyor and Code Climate integrations ([e518299c](https://github.com/gicentre/prettier-plugin-elm/commit/e518299c4114a4251f71ead87ed49eeb60c5f79c), [#9](https://github.com/gicentre/prettier-plugin-elm/issues/9), [0e68c6eb](https://github.com/gicentre/prettier-plugin-elm/commit/0e68c6eb674b7da999351cc734e8dd545be67013))

- Remove `prettier` from `peerDependencies` to fix a warning when installing the plugin globally ([0aea2ea6](https://github.com/gicentre/prettier-plugin-elm/commit/0aea2ea6b6c17d02100ea2a71b430deea1247cfd), [ff1411f9](https://github.com/gicentre/prettier-plugin-elm/commit/ff1411f952a4edb319d043f7aa3af59bb1875117))

- Upgrade dependencies ([a36e0017](https://github.com/gicentre/prettier-plugin-elm/commit/a36e0017f9759bf667c2a88b4e4dedb38f684806))

- Reflect recent changes in README.md ([be2676b7](https://github.com/gicentre/prettier-plugin-elm/commit/be2676b7ba54856e35e4a32b89bb7975623c7d24))

## 0.4.1 (2018-10-14)

- Fix exception in `getElmFormatVersion()` when no global `elm-format` is installed ([#6](https://github.com/gicentre/prettier-plugin-elm/issues/6))

## 0.4.0 (2018-10-13)

- Upgrade `elm-format` to `0.8.1` to support Elm `0.19` ([#4](https://github.com/gicentre/prettier-plugin-elm/issues/4))

  This includes replacing `module Main exposing (..)` with `module Main exposing (something)` in tests, according to the new output in `elm-format`.

  To support formatting of Elm code in markdown blocks, `prettier-plugin-elm` passes `--elm-version=0.19` to `elm-format`.
  If you use Elm `0.18`, please install `prettier-plugin-elm@0.3`.

- Stop running tests in Node 9 due to its end of life on 2018-06-30 ([#5](https://github.com/gicentre/prettier-plugin-elm/issues/5))

- Internal:
  - Upgrade dependencies
  - Add pre-push git hook via [`husky`](https://github.com/typicode/husky) to avoid dumb linting errors in CI

## 0.3.0 (2018-05-23)

- Implement caching mechanism to speed-up formatting of Elm blocks in markdown files ([#3](https://github.com/gicentre/prettier-plugin-elm/issues/3))

- Simplify `locStart()` and `locEnd()` ([#2](https://github.com/gicentre/prettier-plugin-elm/issues/2))

- Configure automatic testing on Windows using [AppVeyor](http://appveyor.com/).

## 0.2.2 & 0.2.1 & 0.2.0 (2018-04-12)

- Switch to `elm-format@0.7.0-exp`
- Use correct instance of `elm-format` when globally installed with npm ([#1](https://github.com/gicentre/prettier-plugin-elm/issues/1))
- Fix ` ```markdown ` syntax highlighting on GitHub and NPM

## 0.1.0 (2018-03-16)

Minimal working solution that uses `elm-format@0.6.1-alpha`.
