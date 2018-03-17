"use strict";

const fs = require("fs");
const path = require("path");
const prettier = require("prettier");

const fixturesDirName = path.resolve(__dirname, "fixtures");
const files = fs.readdirSync(fixturesDirName);
files.forEach(sourceFileName => {
  if (
    !sourceFileName.match(/\.(md|elm)$/) ||
    sourceFileName.match(/\.prettified\./)
  ) {
    return;
  }

  test(`${sourceFileName}`, () => {
    const formattedFileName = sourceFileName.replace(
      /(\.[a-z]+)$/,
      ".prettified$1"
    );
    const sourceFilePath = path.resolve(fixturesDirName, sourceFileName);
    const formattedFilePath = path.resolve(fixturesDirName, formattedFileName);
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

    expect(expectedFormattedText).toBe(actualResult);
  });
});
