import { generateBaseConfigs } from "@kachkaev/eslint-config-base";
import { defineConfig } from "eslint/config";

// The base config only covers `.ts` and `.tsx` files, which would leave our `.mts` tests and test
// helpers unlinted. Remove this once the base config covers them too.
const coverMtsFiles = (pattern: string) =>
  pattern === "**/*.{ts,tsx}" ? "**/*.{ts,tsx,mts}" : pattern;

const baseConfigs = generateBaseConfigs().map((config) => ({
  ...config,
  ...(config.files && {
    files: config.files.map((entry) =>
      typeof entry === "string"
        ? coverMtsFiles(entry)
        : entry.map((pattern) => coverMtsFiles(pattern)),
    ),
  }),
}));

export default defineConfig([
  baseConfigs,

  {
    ignores: [
      ".changeset/**",
      ".husky/**",
      "cache/**",
      "coverage/**",
      "dist/**",
      "fixtures/**",
    ],
  },

  {
    rules: {
      "@typescript-eslint/consistent-type-assertions": "off", // Parsed cache records and Prettier APIs that differ between major versions cross trusted boundaries; a cast beats hand-validating them.
      "@typescript-eslint/explicit-module-boundary-types": "off", // Internal helpers are fine with inferred return types.
      "func-style": "off", // Helpers are consistently bound to consts in this codebase.
      "unicorn/no-top-level-assignment-in-function": "off", // The elm-format version is computed lazily and kept for the lifetime of the process; restructuring that adds risk without any benefit.
      "unicorn/prefer-number-coercion": "off", // `Number()` parses env values differently: "100abc" becomes NaN rather than 100, and "1e3" becomes 1000 rather than 1.
    },
  },

  {
    // Rules added by @kachkaev/eslint-config-base v2 that this codebase does not follow yet.
    rules: {
      "unicorn/consistent-boolean-name": "off",
      "unicorn/max-nested-calls": "off",
      "unicorn/no-top-level-assignment-in-function": "off",
      "unicorn/no-unused-array-method-return": "off",
      "unicorn/no-useless-else": "off",
      "unicorn/no-useless-template-literals": "off",
      "unicorn/prefer-number-coercion": "off",
      "unicorn/prefer-simple-condition-first": "off",
    },
  },

  {
    files: ["**/*.test.mts", "src/test-helpers/**"],
    rules: {
      "import/no-extraneous-dependencies": "off", // Tests are not published, so their packages live in devDependencies.
      "unicorn/max-nested-calls": "off", // Assertions like `expect(await format(…))` read better inline than split into variables.
    },
  },
]);
