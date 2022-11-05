/* eslint-disable import/no-anonymous-default-export */
/** @type {import("jest").Config} */
export default {
  collectCoverage: process.env.COVERAGE === "true",
  collectCoverageFrom: ["dist/**/*.js", "!dist/**/*.test.js"],
  testRegex: ".test.js$",
};
