/* eslint-disable import/no-anonymous-default-export */
/** @type {import("jest").Config} */
export default {
  collectCoverage: !!process.env.TEST_COVERAGE,
  collectCoverageFrom: ["dist/**/*.js", "!dist/**/*.test.js"],
  testRegex: ".test.js$",
};
