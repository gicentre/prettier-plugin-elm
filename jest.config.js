"use strict";

const testResultsAndCoverage = !!process.env.REPORT_TEST_RESULTS_AND_COVERAGE;

module.exports = {
  collectCoverage: testResultsAndCoverage,
  collectCoverageFrom: ["dist/**/*.js", "!dist/**/*.test.js"],
  coverageReporters: ["cobertura", "html", "text"],
  reporters: testResultsAndCoverage
    ? ["default", ["jest-junit", { suiteNameTemplate: "{filepath}" }]]
    : ["default"],
  testRegex: ".test.js$",
};
