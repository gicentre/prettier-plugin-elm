module.exports = {
  extends: ["@kachkaev/eslint-config-base"],
  rules: {
    /* eslint-disable @typescript-eslint/naming-convention */
    "unicorn/prefer-json-parse-buffer": "off",
    "unicorn/prefer-module": "off",
    "unicorn/prefer-node-protocol": "off",
    /* eslint-enable @typescript-eslint/naming-convention */
  },
};
