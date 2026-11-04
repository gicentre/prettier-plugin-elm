---
"prettier-plugin-elm": patch
---

pr: 81

Fix missing properties in errors retrieved from the cache, so that `elm-format` failures are no longer reported as an empty `Error`
