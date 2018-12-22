"use strict";

const fs = require("fs");
const path = require("path");
const prettier = require("prettier");
const tempDir = require("temp-dir");
const rimraf = require("rimraf");

const fixturesDir = path.resolve(__dirname, "../fixtures");
const files = fs.readdirSync(fixturesDir);

beforeAll(() => {
  rimraf.sync(path.resolve(tempDir, "prettier-plugin-elm"));
});

files.forEach(sourceFileName => {
  if (
    !sourceFileName.match(/\.(md|elm)$/) ||
    sourceFileName.match(/\.prettified\./)
  ) {
    return;
  }

  test(`formats fixture ${sourceFileName}`, () => {
    const formattedFileName = sourceFileName.replace(
      /(\.[a-z]+)$/,
      ".prettified$1"
    );
    const sourceFilePath = path.resolve(fixturesDir, sourceFileName);
    const formattedFilePath = path.resolve(fixturesDir, formattedFileName);
    const formattedFileExists = fs.existsSync(formattedFilePath);

    const sourceText = fs.readFileSync(sourceFilePath, "utf8");
    const expectedFormattedText = formattedFileExists
      ? fs.readFileSync(formattedFilePath, "utf8")
      : sourceText;

    let actualResult;
    try {
      actualResult = prettier.format(sourceText, {
        filepath: sourceFilePath,
        plugins: [path.resolve(__dirname, "..")]
      });
    } catch (e) {
      actualResult = sourceText;
    }

    expect(actualResult).toBe(expectedFormattedText);
  });
});
