/** @type{import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "@kachkaev/eslint-config-base",
    "@kachkaev/eslint-config-base/extra-type-checking",
  ],

  reportUnusedDisableDirectives: true,

  rules: {
    "unicorn/prefer-module": "off", // Can be enabled after switching to ESM
  },

  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".d.ts"],
      },
    },
  },
};
