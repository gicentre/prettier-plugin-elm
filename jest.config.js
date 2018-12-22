module.exports = {
  collectCoverageFrom: ["dist/**/*.js"],
  moduleFileExtensions: ["js", "json", "ts"],
  // testMatch: ["dist/?(*.).test.js"],
  testMatch: ["**/?(*.)(spec|test).ts"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
};
