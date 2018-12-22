"use strict";

const REPORT_TEST_RESULTS_AND_COVERAGE = !!process.env
  .REPORT_TEST_RESULTS_AND_COVERAGE;

module.exports = {
  collectCoverage: REPORT_TEST_RESULTS_AND_COVERAGE,
  collectCoverageFrom: ["dist/**/*.js", "!dist/**/*.test.js"],
  coverageReporters: ["cobertura", "html", "text"],
  reporters: REPORT_TEST_RESULTS_AND_COVERAGE
    ? ["default", "jest-junit"]
    : ["default"],
};
