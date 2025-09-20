import { defineConfig } from "vitest/config";

// eslint-disable-next-line import/no-default-export -- TODO: revisit after updating ESLint rules
export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      include: ["dist/**/*.js"],
      exclude: ["dist/**/*.test.mjs"],
      enabled: process.env["COVERAGE"] === "true",
    },
    include: ["dist/**/*.test.mjs"],
    exclude: ["**/node_modules/**"],
  },
});
