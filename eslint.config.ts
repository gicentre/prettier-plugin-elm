import { generateBaseConfigs } from "@kachkaev/eslint-config-base";
import { defineConfig } from "eslint/config";

export default defineConfig([
  generateBaseConfigs(),

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
    files: ["**/*.test.mts", "src/test-helpers/**"],
    rules: {
      "import/no-extraneous-dependencies": "off", // Tests are not published, so their packages live in devDependencies.
    },
  },
]);
