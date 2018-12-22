const fs = require("fs");
const makeDir = require("make-dir");
const objectHash = require("object-hash");
const path = require("path");
const serializeError = require("serialize-error");
const tempDir = require("temp-dir");

const cacheDir = process.env.PRETTIER_PLUGIN_ELM_CACHE_DIR
  ? path.resolve(process.env.PRETTIER_PLUGIN_ELM_CACHE_DIR)
  : path.resolve(tempDir, "prettier-plugin-elm");

const cacheMax = process.env.PRETTIER_PLUGIN_ELM_CACHE_MAX
  ? parseInt(process.env.PRETTIER_PLUGIN_ELM_CACHE_MAX, 10)
  : 1000;

const cacheGCInterval = process.env.PRETTIER_PLUGIN_ELM_CACHE_GC_INTERVAL
  ? parseInt(process.env.PRETTIER_PLUGIN_ELM_CACHE_GC_INTERVAL, 10)
  : 1000 * 60;

/* istanbul ignore next */
const noop = () => {};

function getCachedValue(fn, args) {
  const cacheKey = objectHash(args);
  const recordFilePath = path.resolve(cacheDir, `${cacheKey}.json`);
  let record;
  let recordIsFromCache = false;

  // load value or error from cache
  try {
    record = JSON.parse(fs.readFileSync(recordFilePath, "utf8"));
    recordIsFromCache = true;
  } catch (e) {
    // a failure to load from cache implies calling fn
    try {
      record = {
        value: fn.apply(null, args)
      };
    } catch (fnError) {
      const serializedError = serializeError(fnError);
      delete serializedError.stack;
      record = {
        error: serializedError
      };
    }
  }

  try {
    makeDir.sync(cacheDir);
    fs.writeFileSync(`${recordFilePath}.touchfile`, "");
    if (!recordIsFromCache) {
      fs.writeFileSync(recordFilePath, JSON.stringify(record), "utf8");
    }
    collectGarbageIfNeeded();
  } catch (e) {
    // a failure to save record into cache or clean garbage
    // should not affect the result of the function

    /* istanbul ignore next */
    if (process.env.NODE_ENV === "test") {
      throw e;
    }
  }

  if (record.error) {
    const errorToThrow = new Error();
    for (const errorProperty in record.error) {
      /* istanbul ignore else */
      if (record.error.hasOwnProperty(errorProperty)) {
        errorToThrow[errorProperty] = record.error.property;
      }
    }
    throw errorToThrow;
  } else {
    return record.value;
  }
}

function collectGarbageIfNeeded() {
  const pathToGCTouchfile = path.resolve(cacheDir, `gc.touchfile`);
  try {
    const lastGCTime = fs.statSync(pathToGCTouchfile).mtimeMs;
    if (lastGCTime + cacheGCInterval > +new Date()) {
      // no need to collect garbage
      return;
    }
  } catch (e) {
    // a failure to read modification time for the GC touchfile
    // means that GC needs to be done for the first time
  }

  fs.writeFileSync(pathToGCTouchfile, "");
  const recordInfos = [];
  fs.readdirSync(cacheDir).map(recordFileName => {
    if (!recordFileName.endsWith(".json")) {
      return;
    }
    const recordFilePath = path.resolve(cacheDir, recordFileName);
    const recordInfo = {
      path: recordFilePath,
      touchedAt: 0
    };
    try {
      recordInfo.touchedAt = fs.statSync(`${recordFilePath}.touchfile`).mtimeMs;
    } catch (e) {
      // fs.statSync may fail if another GC process has just deleted it;
      // this is not critical

      /* istanbul ignore next */
      if (process.env.NODE_ENV === "test") {
        throw e;
      }
    }
    recordInfos.push(recordInfo);
  });

  recordInfos.sort((a, b) => {
    return b.touchedAt - a.touchedAt;
  });
  const recordInfosToDelete = recordInfos.slice(cacheMax);

  recordInfosToDelete.forEach(recordInfo => {
    // files are deleted asynchronously and possible errors are ignored
    fs.unlink(recordInfo.path, noop);
    fs.unlink(`${recordInfo.path}.touchfile`, noop);
  });
}

module.exports = {
  getCachedValue
};
