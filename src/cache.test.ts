import fs from "fs";
import { resolve } from "path";
import prettier from "prettier";
import rimraf from "rimraf";
import sleep from "sleep-promise";
import * as util from "./util";

const fixturesDir = resolve(__dirname, "../fixtures");
const cacheDir = resolve(__dirname, "../cache");
const cacheMax = 21; // number of blocks in multiple-blocks.md fixture
const cacheGCInterval = 1000;

test(`correctly deals with cache`, () => {
  rimraf.sync(cacheDir);
  process.env.PRETTIER_PLUGIN_ELM_CACHE_DIR = cacheDir;
  process.env.PRETTIER_PLUGIN_ELM_CACHE_MAX = `${cacheMax}`;
  process.env.PRETTIER_PLUGIN_ELM_CACHE_GC_INTERVAL = `${cacheGCInterval}`;

  const spyForFormatTextWithElmFormat = jest.spyOn(
    util,
    "formatTextWithElmFormat",
  );

  const sourceText = fs.readFileSync(
    resolve(fixturesDir, "multiple-blocks.md"),
    "utf8",
  );
  const expectedFormattedText = fs.readFileSync(
    resolve(fixturesDir, "multiple-blocks.prettified.md"),
    "utf8",
  );

  // multiple-blocks.md, first run – no cache
  expect(
    prettier.format(sourceText, {
      parser: "markdown",
      plugins: [resolve(__dirname, "..")],
    }),
  ).toEqual(expectedFormattedText);
  const numberOfFormatCallsInFirstRun =
    spyForFormatTextWithElmFormat.mock.calls.length;
  expect(numberOfFormatCallsInFirstRun).toBeGreaterThan(0);

  // multiple-blocks.md, second run – with cache
  expect(
    prettier.format(sourceText, {
      parser: "markdown",
      plugins: [resolve(__dirname, "..")],
    }),
  ).toEqual(expectedFormattedText);
  expect(spyForFormatTextWithElmFormat.mock.calls.length).toBe(
    numberOfFormatCallsInFirstRun,
  );

  return sleep(cacheGCInterval * 2).then(() => {
    // a call to formatTextWithElmFormat() that triggers garbage collection
    prettier.format("{- -}", {
      parser: "elm" as any,
      plugins: [resolve(__dirname, "..")],
    });

    // multiple-blocks.md, third run – with cache except for one block that was previously garbage collected
    expect(
      prettier.format(sourceText, {
        parser: "markdown",
        plugins: [resolve(__dirname, "..")],
      }),
    ).toEqual(expectedFormattedText);
    expect(
      spyForFormatTextWithElmFormat.mock.calls.length,
    ).toBeGreaterThanOrEqual(
      numberOfFormatCallsInFirstRun + 1 /* for "" */ + 1 /* for GC-d block */,
    );
  });
});
