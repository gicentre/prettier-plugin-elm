import { defineConfig } from "vitest/config";

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
