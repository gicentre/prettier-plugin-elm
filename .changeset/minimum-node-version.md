---
"prettier-plugin-elm": major
---

pr: 82

Set minimum Node version to 22.12.0. Version 0.12.0 declared support for Node 18.20.6 but could not be loaded below Node 20.19 because of an ESM-only dependency.

This is also the first stable release. The plugin has been stable for years, so staying on `0.x` no longer gave us any benefit. Apart from this and the changes below, it works the same as `0.12.0`. From now on, breaking changes such as dropping a Node.js or Prettier version are major releases, and `elm-format` updates, which may change how code is formatted, are minor releases.
