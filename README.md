<div align="center">
<img alt="Prettier"
  src="https://cdn.rawgit.com/prettier/prettier-logo/master/images/prettier-icon-light.svg">
<img alt="Elm"
  hspace="25"
  height="210"
  src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Elm_logo.svg/1024px-Elm_logo.svg.png">
</div>

<h2 align="center">Prettier Elm Plugin by <a href="https://www.gicentre.net">giCentre</a></h2>

<p align="center">
  <a href="https://github.com/gicentre/prettier-plugin-elm/blob/master/LICENSE">
    <img alt="license" src="https://img.shields.io/github/license/gicentre/prettier-plugin-elm.svg?style=flat-square">
  </a>
  <a href="https://www.npmjs.com/package/prettier-plugin-elm">
    <img alt="npm version" src="https://img.shields.io/npm/v/prettier-plugin-elm.svg?style=flat-square">
  </a>
  <a href="https://travis-ci.org/gicentre/prettier-plugin-elm">
    <img alt="travis" src="https://img.shields.io/travis/gicentre/prettier-plugin-elm/master.svg?style=flat-square">
  </a>
  <!-- <a href="https://www.npmjs.com/package/prettier-plugin-elm">
    <img alt="monthly downloads" src="https://img.shields.io/npm/dm/prettier-plugin-elm.svg?style=flat-square">
  </a> -->
  <a href="#badge">
    <img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square">
  </a>
  <a href="https://twitter.com/giCentre">
    <img alt="Follow+giCentre+on+Twitter" src="https://img.shields.io/twitter/follow/giCentre.svg?label=follow+giCentre&style=flat-square">
  </a>
</p>

This plugin integrates [`elm-format`](https://github.com/avh4/elm-format) into [Prettier](https://github.com/prettier/prettier), thus providing you with a universal interface to all your code formatting needs.

In addition to formatting `.elm` files via Prettier API, this plugin prettifies Elm code blocks inside markdown files. For example:

<!-- prettier-ignore -->
````md
# Hello world example
```elm
import  Html exposing     (text)

main = text      "Hello, World!"
```
````

becomes:

````md
# Hello world example

```elm
import Html exposing (text)


main =
    text "Hello, World!"
```
````

If you want to disable code formatting for a particular code block, simply add <nobr>`<!-- prettier-ignore -->`</nobr> before ` ```elm `.

## Install

```bash
yarn add --dev prettier prettier-plugin-elm
```

Installing `prettier-plugin-elm` also installs a local copy of `elm-format`, so you do not need to manually obtain one yourself.
Despite an overhead in about ≈20 MB of disk space used by `node_modules`, this hard-coded dependency makes it easier to collaborate on the project and test your code quality with CI tools.

## Use

````bash
## format all elm files in your project
yarn prettier --write "**/*.elm"

## format all markdown files including ```elm code blocks inside them
yarn prettier --write "**/*.md"
````

If you are using a text editor that supports Prettier as plugin, you get all its perks for your Elm code too!

## Contribute

If you're interested in contributing to the development of Prettier for Elm, you can follow the [CONTRIBUTING guide from Prettier](https://github.com/prettier/prettier/blob/master/CONTRIBUTING.md), as it all applies to this repository too.

To test it out on an Elm file:

* Clone this repository.
* Run `yarn`.
* Create a file called `prettier-test.elm` or `prettier-test.md`.
* Run `yarn prettier prettier-test.elm` or `yarn prettier prettier-test.md` to check the output.

## Credits

This project was inspired by https://github.com/prettier/plugin-python.
