import { beforeAll, expect, test, vi } from "vitest";
import fs from "fs";
import path from "path";
import { rimraf } from "rimraf";
import tempDir from "temp-dir";

import { format, getPrettier } from "./test-helpers/prettier-wrapper";

const fixturesDir = path.resolve(__dirname, "../fixtures");
const files = fs.readdirSync(fixturesDir);

beforeAll(async () => {
  await rimraf(path.resolve(tempDir, "prettier-plugin-elm"));
  vi.resetModules();
});

test(`uses correct Prettier core version`, async () => {
  const prettier = await getPrettier();
  expect(prettier.version[0]).toEqual(
    process.env.PRETTIER_MAJOR_VERSION ?? "3",
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
    let expectedFormattedText = formattedFileExists
      ? fs.readFileSync(formattedFilePath, "utf8")
      : sourceText;

    // TODO: remove this when we drop Prettier 1
    if (
      process.env.PRETTIER_MAJOR_VERSION === "1" &&
      sourceFileName === "empty.md"
    ) {
      expectedFormattedText = expectedFormattedText.replace(
        "```elm\n\n```",
        "```elm\n```",
      );
    }

    let actualResult;
    try {
      actualResult = await format(sourceText, {
        filepath: sourceFilePath,
        plugins: [path.resolve(__dirname, "..")],
      });
    } catch (error) {
      console.log("err", error);
      actualResult = sourceText;
    }

    expect(actualResult).toBe(expectedFormattedText);
  });
}
