import fs from "fs";
import makeDir from "make-dir";
import objectHash from "object-hash";
import { resolve } from "path";
import serializeError from "serialize-error";
import { ErrorObject } from "serialize-error";
import tempDir from "temp-dir";

const cacheDir = process.env.PRETTIER_PLUGIN_ELM_CACHE_DIR
  ? resolve(process.env.PRETTIER_PLUGIN_ELM_CACHE_DIR)
  : resolve(tempDir, "prettier-plugin-elm");

const cacheMax = process.env.PRETTIER_PLUGIN_ELM_CACHE_MAX
  ? parseInt(process.env.PRETTIER_PLUGIN_ELM_CACHE_MAX, 10)
  : 1000;

const cacheGCInterval = process.env.PRETTIER_PLUGIN_ELM_CACHE_GC_INTERVAL
  ? parseInt(process.env.PRETTIER_PLUGIN_ELM_CACHE_GC_INTERVAL, 10)
  : 1000 * 60;

/* istanbul ignore next */
const noop = () => {
  //
};

export const getCachedValue = <Args extends any[], Result>(
  fn: (...args: Args) => Result,
  args: Args,
  extraCacheKeyFactors?: any[],
): Result => {
  const cacheKey = objectHash({ args, extraCacheKeyFactors });
  const recordFilePath = resolve(cacheDir, `${cacheKey}.json`);
  let record:
    | { value: Result; error?: undefined }
    | { error: ErrorObject; value?: undefined };
  let recordIsFromCache = false;

  // load value or error from cache
  try {
    record = JSON.parse(fs.readFileSync(recordFilePath, "utf8"));
    recordIsFromCache = true;
  } catch (e) {
    // a failure to load from cache implies calling fn
    try {
      record = {
        value: fn.apply(null, args),
      };
    } catch (fnError) {
      const serializedError = serializeError(fnError);
      delete serializedError.stack;
      record = {
        error: serializedError,
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
        (errorToThrow as any)[errorProperty] = record.error.property;
      }
    }
    throw errorToThrow;
  } else {
    return record.value;
  }
};

interface RecordInfo {
  path: string;
  touchedAt: number;
}

function collectGarbageIfNeeded() {
  const pathToGCTouchfile = resolve(cacheDir, `gc.touchfile`);
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
  const recordInfos: RecordInfo[] = [];
  fs.readdirSync(cacheDir).map((recordFileName) => {
    if (!recordFileName.endsWith(".json")) {
      return;
    }
    const recordFilePath = resolve(cacheDir, recordFileName);
    const recordInfo = {
      path: recordFilePath,
      touchedAt: 0,
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

  recordInfosToDelete.forEach((recordInfo) => {
    // files are deleted asynchronously and possible errors are ignored
    fs.unlink(recordInfo.path, noop);
    fs.unlink(`${recordInfo.path}.touchfile`, noop);
  });
}
