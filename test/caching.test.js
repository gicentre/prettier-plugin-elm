"use strict";

const fs = require("fs");
const path = require("path");
const prettier = require("prettier");
const rimraf = require("rimraf");
const sleep = require("sleep-promise");

const util = require("../src/util");

const fixturesDirName = path.resolve(__dirname, "fixtures");
const cacheDir = path.resolve(__dirname, "../cache");
const cacheMax = 21; // number of blocks in multiple-blocks.md fixture
const cacheGCInterval = 1000;

test(`correctly deals with cache`, () => {
  rimraf.sync(cacheDir);
  process.env.PRETTIER_PLUGIN_ELM_CACHE_DIR = cacheDir;
  process.env.PRETTIER_PLUGIN_ELM_CACHE_MAX = `${cacheMax}`;
  process.env.PRETTIER_PLUGIN_ELM_CACHE_GC_INTERVAL = `${cacheGCInterval}`;

  const spyForFormatTextWithElmFormat = jest.spyOn(
    util,
    "formatTextWithElmFormat"
  );

  const sourceText = fs.readFileSync(
    path.resolve(fixturesDirName, "multiple-blocks.md"),
    "utf8"
  );
  const expectedFormattedText = fs.readFileSync(
    path.resolve(fixturesDirName, "multiple-blocks.prettified.md"),
    "utf8"
  );

  // multiple-blocks.md, first run – no cache
  expect(
    prettier.format(sourceText, {
      parser: "markdown",
      plugins: [path.resolve(__dirname, "..")]
    })
  ).toEqual(expectedFormattedText);
  const numberOfFormatCallsInFirstRun =
    spyForFormatTextWithElmFormat.mock.calls.length;
  expect(numberOfFormatCallsInFirstRun).toBeGreaterThan(0);

  // multiple-blocks.md, second run – with cache
  expect(
    prettier.format(sourceText, {
      parser: "markdown",
      plugins: [path.resolve(__dirname, "..")]
    })
  ).toEqual(expectedFormattedText);
  expect(spyForFormatTextWithElmFormat.mock.calls).toHaveLength(
    numberOfFormatCallsInFirstRun
  );

  return sleep(cacheGCInterval * 2).then(() => {
    // a call to formatTextWithElmFormat() that triggers garbage collection
    prettier.format("", {
      parser: "elm",
      plugins: [path.resolve(__dirname, "..")]
    });

    // multiple-blocks.md, third run – with cache except for one block that was previously garbage collected
    expect(
      prettier.format(sourceText, {
        parser: "markdown",
        plugins: [path.resolve(__dirname, "..")]
      })
    ).toEqual(expectedFormattedText);
    expect(spyForFormatTextWithElmFormat.mock.calls).toHaveLength(
      numberOfFormatCallsInFirstRun + 1 /* for "" */ + 1 /* for GC-d block */
    );
  });
});
