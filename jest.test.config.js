"use strict";

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.js", "!<rootDir>/node_modules/"],
  testMatch: ["**/?(*.)(spec|test).(j|t)s?(x)"],
};
