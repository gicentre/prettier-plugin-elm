---
"prettier-plugin-elm": minor
---

pr: 82

**[breaking change]** Set minimum Node version to 22.12.0. Version 0.12.0 declared support for Node 18.20.6 but could not be loaded below Node 20.19 because of an ESM-only dependency.
