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
    },
  },

  {
    // Rules added by @kachkaev/eslint-config-base v2 that this codebase does not follow yet.
    rules: {
      "unicorn/max-nested-calls": "off",
      "unicorn/no-top-level-assignment-in-function": "off",
      "unicorn/no-useless-template-literals": "off",
      "unicorn/prefer-number-coercion": "off",
      "unicorn/prefer-simple-condition-first": "off",
    },
  },

  {
    files: ["**/*.test.mts", "src/test-helpers/**"],
    rules: {
      "import/no-extraneous-dependencies": "off", // Tests are not published, so their packages live in devDependencies.
    },
  },
]);
