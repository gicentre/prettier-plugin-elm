<p align="center">
  &nbsp;&nbsp;<img alt="Prettier"
  src="https://cdn.rawgit.com/prettier/prettier-logo/master/images/prettier-icon-light.svg">&nbsp;&nbsp;
  &nbsp;&nbsp;<img alt="Elm"
  height="210"
  src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Elm_logo.svg/1024px-Elm_logo.svg.png">&nbsp;&nbsp;
</p>

<h2 align="center">Prettier Elm plugin</h2>

<p align="center">
  <a href="https://github.com/gicentre/prettier-plugin-elm/blob/main/LICENSE">
    <img alt="license: BSD-3-Clause" src="https://img.shields.io/github/license/gicentre/prettier-plugin-elm.svg?style=flat-square"><!--
  --></a>
  <a href="https://www.npmjs.com/package/prettier-plugin-elm">
    <img alt="NPM package" src="https://img.shields.io/npm/v/prettier-plugin-elm.svg?style=flat-square"><!--
  --></a>
  <a href="https://github.com/gicentre/prettier-plugin-elm/actions/workflows/ci.yml">
    <img alt="GitHub Workflow Status (CI)" src="https://img.shields.io/github/actions/workflow/status/gicentre/prettier-plugin-elm/ci.yml?label=CI&style=flat-square"><!--
  --></a>
  <a href="https://codecov.io/gh/gicentre/prettier-plugin-elm">
    <img alt="Codecov" src="https://img.shields.io/codecov/c/github/gicentre/prettier-plugin-elm?style=flat-square&token=38aa3a14f00b4d3cbb8e39a9d69e6c64"><!--
  --></a>
  <br>
  <a href="https://www.npmjs.com/package/prettier-plugin-elm">
    <img alt="downloads" src="https://img.shields.io/npm/dt/prettier-plugin-elm.svg?style=flat-square"><!--
   --></a>
  <a href="#badge">
    <img alt="code style: Prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square"><!--
  --></a>
  <a href="https://twitter.com/giCentre">
    <img alt="giCentre on Twitter" src="https://img.shields.io/badge/follow-%40giCentre-1DA1F2?logo=twitter&style=flat-square"><!--
  --></a>
</p>

This plugin integrates [`elm-format`](https://github.com/avh4/elm-format) into [Prettier](https://github.com/prettier/prettier).
In addition to dealing with `.elm` files via Prettier API, this plugin lets you format Elm code blocks inside markdown documents.

For example,

<!-- prettier-ignore -->
````markdown
#    Hello world in Elm
```elm
import  Html exposing     (text)

main = text      "Hello, World!"
```
````

becomes:

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

The latest version of `prettier-plugin-elm` assumes that you are using Elm 0.19.
For compatibility with Elm 0.18, please install `prettier-plugin-elm@0.3`.

## Getting started

The instructions assume that you have already installed Node.js on your machine.
To check its presence, open the terminal and type these two commands:

```sh
node --version
## ≥ 12.15

npm --version
## ≥ 6.14
```

If you see errors or if the displayed versions are too old, follow the instructions on [nodejs.org](https://nodejs.org) to download this software.
By installing Node.js you also get NPM, so there is no need to obtain it separately.
You might need to restart the terminal or the whole machine to see the new versions.

### Global install

The easiest way to get started with Prettier and its Elm plugin is to globally install two NPM packages:

```sh
npm install --global prettier prettier-plugin-elm
```

Global install is preferred in simple scenarios, especially when you are working alone on small projects.

### Local install

When collaborating on a group project, it is useful to keep versions of Prettier and its Elm plugin in sync within the team.
This avoids frequent unwanted changes in source files, which can be caused by formatting differences between tool versions.

1.  Open a terminal and ensure you are located at the root of your project:

    ```sh
    pwd
    ## prints something like /path/to/my/project
    ```

1.  If there is no `package.json` file in your project directory, initialize it:

    ```sh
    npm init --yes
    ```

    ```sh
    ## if you use yarn instead of npm
    yarn init --yes
    ```

1.  Run the install command:

    ```sh
    npm install --only=dev prettier prettier-plugin-elm
    ```

    ```sh
    ## if you use yarn instead of npm
    yarn add --dev prettier prettier-plugin-elm
    ```

    Versions of Prettier and its Elm plugin will be written to `package.json` and `package-lock.json` / `yarn.lock`.
    If you share these files with the rest of your source code, others will be able to get the exact same versions of the tools by running:

    ```sh
    npm install
    ```

    ```sh
    ## if you use yarn instead of npm
    yarn install
    ```

Note that you need to repeat the local install steps for every project.

---

ℹ️ Combining global and local setup is allowed.
If two copies of Prettier are available for a given folder, a local one is used.

---

ℹ️ To upgrade Prettier and its Elm plugin, run the same command as you used to install them.

---

ℹ️ Installing `prettier-plugin-elm` also downloads a compatible version of `elm-format`, so you do not need to manually obtain it yourself.

## Usage

Please complete the the _Getting started_ section first.

### Via editor

Follow the [instructions on prettier.io](https://prettier.io/docs/en/editors.html) to download Prettier extension for your editor.
As the second step, you might need to open editor preferences and select Prettier as your preferred file formatter.
Most editors can format files on save and you are encouraged to enable this option.

---

ℹ️ You might need to restart the editor if formatting does not work for Elm or Markdown files right away.

### Via terminal

If you have a locally installed copy of Prettier, you can configure a script to [lint](https://en.wikipedia.org/wiki/Linting) (i.e. check) all your project files and even automatically fix their formatting.

For inspiration, see the `scripts` section in this project’s [`package.json`](https://github.com/gicentre/prettier-plugin-elm/blob/main/tsconfig.json).
You will also need to create a file named `.prettierignore`, similar to the [one in this project](https://github.com/gicentre/prettier-plugin-elm/blob/main/.prettierignore).

```sh
## Lint (i.e. check) if all source files are formatted
npm run lint:prettier

## Fix formatting in all files
npm run fix:prettier
```

```sh
## if you use yarn instead of npm

## Lint (i.e. check) if all source files are formatted
yarn lint:prettier

## Fix formatting in all files
yarn fix:prettier
```

## Implementation details

This plugin is written in TypeScript.
The quality of the codebase is checked using Prettier, [Jest](https://jestjs.io) and [ESLint](https://eslint.org) via [Github Actions](https://github.com/gicentre/prettier-plugin-elm/actions).
Tests run on Linux, macOS and Windows.

Unlike most other [Prettier plugins](https://prettier.io/docs/en/plugins.html#official-plugins), `prettier-plugin-elm` does not contain logic to parse code blocks into syntax trees to then stringify them.
Both of these tasks are delegated to [`elm-format`](https://github.com/avh4/elm-format) by making a call to a sub-process.
Thus, the result of formatting is compatible with what Elm community is used to see.

The only difference to `elm-format` introduced by `prettier-plugin-elm` is related to handling fragments of Elm modules, which is [not supported](https://github.com/avh4/elm-format/issues/65) upstream yet.
See [`src/parser.ts`](https://github.com/gicentre/prettier-plugin-elm/blob/main/src/parser.ts) for details on the workaround.

## Contributing

If you’re interested in contributing to the development of Prettier Elm plugin, please follow the [CONTRIBUTING guide from Prettier](https://github.com/prettier/prettier/blob/main/CONTRIBUTING.md) as it all applies to this repository too.

To run the development version of `prettier-plugin-elm`:

- Clone this repository
- Run `yarn install`
- Run `yarn lint` to make sure that the codebase passes linting
- Run `yarn test` to make sure that TypeScript successfully compiles into JavaScript and and all unit tests pass
- To test the plugin manually, create a file named `prettier-test.elm` (or `.md`).
  Then run `yarn prettier --plugin=. prettier-test.elm` (or `.md`) and check the output.

## Credits

This project was inspired by <https://github.com/prettier/plugin-python>.
Big thanks to Aaron VonderHaar ([@avh4](https://github.com/avh4)) and [contributors](https://github.com/avh4/elm-format/graphs/contributors) for creating [`elm-format`](https://github.com/avh4/elm-format)!
