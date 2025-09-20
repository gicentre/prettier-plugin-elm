/** @type {import("jest").Config} */
const config = {
  collectCoverage: process.env.COVERAGE === "true",
  collectCoverageFrom: ["dist/**/*.js", "!dist/**/*.test.js"],
  testRegex: ".test.js$",
};

export default config;
