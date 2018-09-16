## 0.4.0 (ongoing)

- Upgrade `elm-format` to `0.8` to support Elm `0.19` ([#4](https://github.com/gicentre/prettier-plugin-elm/issues/4))

  This includes replacing `module Main exposing (..)` with `module Main exposing (something)` in tests, according to the new output in `elm-format`.

  To support formatting of Elm code in markdown blocks, `prettier-plugin-elm` passes `--elm-version=0.19` to `elm-format`.
  If you use Elm `0.18`, please install `prettier-plugin-elm@0.3`.

- Stop running tests in Node 9 due to its end of life on 2018-06-30 ([#5](https://github.com/gicentre/prettier-plugin-elm/issues/5))

- Internal:
  - Upgrade dev dependencies
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
