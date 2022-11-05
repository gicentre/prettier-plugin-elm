import fs from "fs";
import path from "path";
import rimraf from "rimraf";
import tempDir from "temp-dir";

import { format, getPrettier } from "./test-helpers/prettier-wrapper";

const fixturesDir = path.resolve(__dirname, "../fixtures");
const files = fs.readdirSync(fixturesDir);

beforeAll(() => {
  rimraf.sync(path.resolve(tempDir, "prettier-plugin-elm"));
});

test(`uses correct Prettier core version`, async () => {
  const prettier = await getPrettier();
  expect(prettier.version).toBe(
    process.env.PRETTIER_V3 ? "3.0.0-alpha.4" : "2.7.1",
  );
});

for (const sourceFileName of files) {
  if (
    !/\.(md|elm)$/.test(sourceFileName) ||
    /\.prettified\./.test(sourceFileName)
  ) {
    continue;
  }

  test(`formats fixture ${sourceFileName}`, async () => {
    const formattedFileName = sourceFileName.replace(
      /(\.[a-z]+)$/,
      ".prettified$1",
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
      actualResult = await format(sourceText, {
        filepath: sourceFilePath,
        plugins: [path.resolve(__dirname, "..")],
      });
    } catch {
      actualResult = sourceText;
    }

    expect(actualResult).toBe(expectedFormattedText);
  });
}
