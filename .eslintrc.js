/** @type{import("eslint").Linter.Config} */
module.exports = {
  extends: ["@kachkaev/eslint-config-base"],
  reportUnusedDisableDirectives: true,
  rules: {
    /* eslint-disable @typescript-eslint/naming-convention */
    "unicorn/prefer-module": "off", // Can be enabled after switching to ESM
    "unicorn/prefer-node-protocol": "off", // Can be enabled after switching to ESM or dropping Node.js 14
    /* eslint-enable @typescript-eslint/naming-convention */
  },
};
