import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { rimraf } from "rimraf";
import { beforeAll, expect, test, vi } from "vitest";

import { format, getPrettier } from "./test-helpers/prettier-wrapper.mjs";

const fixturesDir = path.resolve(__dirname, "../fixtures");
const files = fs.readdirSync(fixturesDir);

beforeAll(async () => {
  await rimraf(
    path.resolve(fs.realpathSync(os.tmpdir()), "prettier-plugin-elm"),
  );
  vi.resetModules();
});

test("uses correct Prettier core version", async () => {
  const prettier = await getPrettier();
  expect(prettier.version[0]).toEqual(
    process.env["PRETTIER_MAJOR_VERSION"] ?? "3",
  );
});

const formatBrokenCode = () =>
  format("import  Html exposg", {
    parser: "elm",
    plugins: [require.resolve(path.resolve(__dirname, ".."))],
  });

test("preserves elm-format error details, also when reading them from cache", async () => {
  await expect(formatBrokenCode()).rejects.toThrow(/elm-format/);
  await expect(formatBrokenCode()).rejects.toThrow(/elm-format/);
});

for (const sourceFileName of files) {
  if (
    !/\.(?:md|elm)$/.test(sourceFileName) ||
    sourceFileName.includes(".prettified.")
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
    const hasFormattedFile = fs.existsSync(formattedFilePath);

    const sourceText = fs.readFileSync(sourceFilePath, "utf8");
    let expectedFormattedText = hasFormattedFile
      ? fs.readFileSync(formattedFilePath, "utf8")
      : sourceText;

    // TODO: remove this when we drop Prettier 1
    if (
      sourceFileName === "empty.md" &&
      process.env["PRETTIER_MAJOR_VERSION"] === "1"
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
        plugins: [require.resolve(path.resolve(__dirname, ".."))],
      });
    } catch {
      actualResult = sourceText;
    }

    expect(actualResult).toBe(expectedFormattedText);
  });
}
