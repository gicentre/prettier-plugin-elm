import fs from "fs";
import path from "path";
import { rimraf } from "rimraf";
import sleep from "sleep-promise";

import * as helpers from "./helpers";
import { format } from "./test-helpers/prettier-wrapper";

const fixturesDir = path.resolve(__dirname, "../fixtures");
const cacheDir = path.resolve(__dirname, "../cache");
const cacheMax = 21; // number of blocks in multiple-blocks.md fixture
const cacheGcInterval = 1000;

test(`correctly deals with cache`, async () => {
  await rimraf(cacheDir);
  process.env.PRETTIER_PLUGIN_ELM_CACHE_DIR = cacheDir;
  process.env.PRETTIER_PLUGIN_ELM_CACHE_MAX = `${cacheMax}`;
  process.env.PRETTIER_PLUGIN_ELM_CACHE_GC_INTERVAL = `${cacheGcInterval}`;

  const spyForFormatTextWithElmFormat = jest.spyOn(
    helpers,
    "formatTextWithElmFormat",
  );

  const sourceText = fs.readFileSync(
    path.resolve(fixturesDir, "multiple-blocks.md"),
    "utf8",
  );
  const expectedFormattedText = fs.readFileSync(
    path.resolve(fixturesDir, "multiple-blocks.prettified.md"),
    "utf8",
  );

  // multiple-blocks.md, first run – no cache
  expect(
    await format(sourceText, {
      parser: "markdown",
      plugins: [path.resolve(__dirname, "..")],
    }),
  ).toEqual(expectedFormattedText);
  const numberOfFormatCallsInFirstRun =
    spyForFormatTextWithElmFormat.mock.calls.length;
  expect(numberOfFormatCallsInFirstRun).toBeGreaterThan(0);

  // multiple-blocks.md, second run – with cache
  expect(
    await format(sourceText, {
      parser: "markdown",
      plugins: [path.resolve(__dirname, "..")],
    }),
  ).toEqual(expectedFormattedText);
  expect(spyForFormatTextWithElmFormat.mock.calls.length).toBe(
    numberOfFormatCallsInFirstRun,
  );

  await sleep(cacheGcInterval * 2);

  // a call to formatTextWithElmFormat() that triggers garbage collection
  await format("{- -}", {
    parser: "elm",
    plugins: [path.resolve(__dirname, "..")],
  });

  // multiple-blocks.md, third run – with cache except for one block that was previously garbage collected
  expect(
    await format(sourceText, {
      parser: "markdown",
      plugins: [path.resolve(__dirname, "..")],
    }),
  ).toEqual(expectedFormattedText);

  expect(
    spyForFormatTextWithElmFormat.mock.calls.length,
  ).toBeGreaterThanOrEqual(
    numberOfFormatCallsInFirstRun + 1 /* for "" */ + 1 /* for GC-d block */,
  );
}, 20_000);
