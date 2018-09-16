<p align="center">
  &nbsp;&nbsp;<img alt="Prettier"
  src="https://cdn.rawgit.com/prettier/prettier-logo/master/images/prettier-icon-light.svg">&nbsp;&nbsp;
  &nbsp;&nbsp;<img alt="Elm"
  height="210"
  src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Elm_logo.svg/1024px-Elm_logo.svg.png">&nbsp;&nbsp;
</p>

<h2 align="center">Prettier Elm plugin</h2>

<p align="center">
  <a href="https://github.com/gicentre/prettier-plugin-elm/blob/master/LICENSE">
    <img alt="license: BSD-3-Clause" src="https://img.shields.io/github/license/gicentre/prettier-plugin-elm.svg?style=flat-square"><!--
  --></a>
  <a href="https://www.npmjs.com/package/prettier-plugin-elm">
    <img alt="NPM package" src="https://img.shields.io/npm/v/prettier-plugin-elm.svg?style=flat-square"><!--
  --></a>
  <a href="https://travis-ci.org/gicentre/prettier-plugin-elm">
    <img alt="Travis" src="https://img.shields.io/travis/gicentre/prettier-plugin-elm/master.svg?style=flat-square&amp;label=Travis"><!--
  --></a>
  <a href="https://travis-ci.org/gicentre/prettier-plugin-elm">
    <img alt="AppVeyor" src="https://img.shields.io/appveyor/ci/kachkaev/prettier-plugin-elm/master.svg?style=flat-square&amp;label=AppVeyor"><!--
  --></a>
  <a href="https://codeclimate.com/github/gicentre/prettier-plugin-elm">
    <img alt="test coverage" src="https://img.shields.io/codeclimate/coverage/github/gicentre/prettier-plugin-elm.svg?style=flat-square"><!--
  --></a>
  <!-- <a href="https://www.npmjs.com/package/prettier-plugin-elm">
    <img alt="monthly downloads" src="https://img.shields.io/npm/dm/prettier-plugin-elm.svg?style=flat-square"><!--
   -></a> -->
  <a href="#badge">
    <img alt="code style: Prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square"><!--
  --></a>
  <a href="https://twitter.com/giCentre">
    <img alt="giCentre on Twitter" src="https://img.shields.io/twitter/follow/giCentre.svg?label=follow+giCentre&style=flat-square"><!--
  --></a>
</p>

Please note that the [plugin ecosystem in Prettier](https://prettier.io/docs/en/plugins.html) is still beta, which may make <nobr>`prettier-plugin-elm`</nobr> not ready for production use yet.

---

This plugin integrates [`elm-format`](https://github.com/avh4/elm-format) into [Prettier](https://github.com/prettier/prettier), thus providing you with a universal interface to code formatting regardless of its language.
In addition to dealing with `.elm` files via Prettier API, this plugin lets you format Elm code blocks inside markdown files. For example

<!-- prettier-ignore -->
````markdown
#    Hello world in Elm
```elm
import  Html exposing     (text)

main = text      "Hello, World!"
```
````

becomes

````markdown
# Hello world in Elm

```elm
import Html exposing (text)


main =
    text "Hello, World!"
```
````

You can disable code formatting for a particular code block by adding <nobr>`<!-- prettier-ignore -->`</nobr> before ` ```elm `.

````markdown
Elm code with custom formatting:

<!-- prettier-ignore -->
```elm
main = text      "Hello, World!"
```

Prettified code:

```elm
main =
    text "Hello, World!"
```
````

In order to successfully format Elm code in markdown blocks, `prettier-plugin-elm` assumes your Elm version is 0.19.
If you use Elm 0.18, please install `prettier-plugin-elm@0.3`.


## Getting started

Simply install `prettier` and `prettier-plugin-elm` as your project’s npm dependencies:

```bash
cd /path/to/project

## initialise an npm project if you haven’t done it yet
npm init
## or
yarn init

## add Prettier and its Elm plugin to project’s dev dependencies
npm install --dev prettier prettier-plugin-elm
## or
yarn add --dev prettier prettier-plugin-elm
```

Installing `prettier-plugin-elm` also installs a local copy of `elm-format`, so you do not need to manually obtain one yourself.

<!-- Despite an overhead in about ≈20 MB of disk space used by `node_modules`, this hard-coded sub-dependency makes it easier to collaborate on the code and also test its quality with CI tools. -->

<!-- Global use of plugin is blocked by https://github.com/prettier/prettier/issues/4000 -->

## Usage

````bash
## format all elm files in your project
./node_modules/.bin/prettier --write "**/*.elm"
## or
yarn prettier --write "**/*.elm"

## format all markdown files including ```elm code blocks inside them
./node_modules/.bin/prettier --write "**/*.md"
## or
yarn prettier --write "**/*.md"
````

## Integration with editors

> Use of this plugin in Atom and VSCode seems to be blocked by [prettier/prettier-atom#395](https://github.com/prettier/prettier-atom/issues/395) and [prettier/prettier-vscode#395](https://github.com/prettier/prettier-vscode/issues/395).
> Feel free to help!

<s>If you are using a text editor that supports Prettier integration (e.g. [Atom](https://atom.io/packages/prettier-atom) or [VSCode](https://github.com/prettier/prettier-vscode)), you can have all Prettier perks for your Elm code too!

In order to get `prettier-plugin-elm` working in projects that do not have local npm dependencies, you can install this plugin globally:

```bash
npm install --global prettier prettier-plugin-elm
```

In this case, you might need to check the settings of your editor’s Prettier extension to make sure that a globally installed Prettier is used when it is not found in project dependencies (i.e. `package.json`).

Nevertheless, it is recommended to always rely on local copies of `prettier` and `prettier-plugin-elm` as this reduces the chance of formatting conflicts between project collaborators.
This may happen if different global versions of Prettier are used.

Installing `prettier-plugin-elm` either locally or globally may require you to restart the editor if formatting does not work right away.</s>

## Implementation details

Unlike [other Prettier plugins](https://prettier.io/docs/en/plugins.html#official-plugins), `prettier-plugin-elm` does not parse the code into a syntax tree to then print it; both of these tasks are delegated to [`elm-format`](https://github.com/avh4/elm-format) and are executed in a single call to a sub-process.
Thus, the result of formatting is compatible with what Elm community is used to see.

The only difference that `prettier-plugin-elm` introduces is related to handling fragments of Elm modules, which is [not yet supported](https://github.com/avh4/elm-format/issues/65) by `elm-format`.
See [`src/parser.js`](https://github.com/gicentre/prettier-plugin-elm/blob/master/src/parser.js) for details on this.

## Contributing

If you’re interested in contributing to the development of Prettier for Elm, you can follow the [CONTRIBUTING guide from Prettier](https://github.com/prettier/prettier/blob/master/CONTRIBUTING.md), as it all applies to this repository too.

To test it out on an Elm file:

- Clone this repository.
- Run `yarn`.
- Create a file called `prettier-test.elm` or `prettier-test.md`.
- Run `yarn prettier prettier-test.elm` or `yarn prettier prettier-test.md` to check the output.

## Credits

This project was inspired by https://github.com/prettier/plugin-python.

Big thanks to Aaron VonderHaar ([@avh4](https://github.com/avh4)) and [contributors](https://github.com/avh4/elm-format/graphs/contributors) for creating [`elm-format`](https://github.com/avh4/elm-format)!
