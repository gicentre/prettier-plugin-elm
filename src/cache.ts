import fs from "fs";
import makeDir from "make-dir";
import objectHash from "object-hash";
import path from "path";
import { ErrorObject, serializeError } from "serialize-error";
import tempDir from "temp-dir";

const cacheDir = process.env["PRETTIER_PLUGIN_ELM_CACHE_DIR"]
  ? path.resolve(process.env["PRETTIER_PLUGIN_ELM_CACHE_DIR"])
  : path.resolve(tempDir, "prettier-plugin-elm");

const cacheMax = process.env["PRETTIER_PLUGIN_ELM_CACHE_MAX"]
  ? Number.parseInt(process.env["PRETTIER_PLUGIN_ELM_CACHE_MAX"], 10)
  : 1000;

const cacheGcInterval = process.env["PRETTIER_PLUGIN_ELM_CACHE_GC_INTERVAL"]
  ? Number.parseInt(process.env["PRETTIER_PLUGIN_ELM_CACHE_GC_INTERVAL"], 10)
  : 1000 * 60;

/* istanbul ignore next */
const noop = () => {
  //
};

const collectGarbageIfNeeded = () => {
  const pathToGcTouchfile = path.resolve(cacheDir, `gc.touchfile`);
  try {
    const lastGcTime = fs.statSync(pathToGcTouchfile).mtimeMs;
    if (lastGcTime + cacheGcInterval > Date.now()) {
      // no need to collect garbage
      return;
    }
  } catch {
    // a failure to read modification time for the GC touchfile
    // means that GC needs to be done for the first time
  }

  fs.writeFileSync(pathToGcTouchfile, "");
  const recordInfos: RecordInfo[] = [];
  fs.readdirSync(cacheDir).map((recordFileName) => {
    if (!recordFileName.endsWith(".json")) {
      return;
    }
    const recordFilePath = path.resolve(cacheDir, recordFileName);
    const recordInfo = {
      path: recordFilePath,
      touchedAt: 0,
    };
    try {
      recordInfo.touchedAt = fs.statSync(`${recordFilePath}.touchfile`).mtimeMs;
    } catch (error) {
      // fs.statSync may fail if another GC process has just deleted it;
      // this is not critical

      /* istanbul ignore next */
      if (process.env["NODE_ENV"] === "test") {
        throw error;
      }
    }
    recordInfos.push(recordInfo);
  });

  recordInfos.sort((a, b) => {
    return b.touchedAt - a.touchedAt;
  });
  const recordInfosToDelete = recordInfos.slice(cacheMax);

  for (const recordInfo of recordInfosToDelete) {
    // files are deleted asynchronously and possible errors are ignored
    fs.unlink(recordInfo.path, noop);
    fs.unlink(`${recordInfo.path}.touchfile`, noop);
  }
};

export const getCachedValue = <Args extends any[], Result>(
  fn: (...args: Args) => Result,
  args: Args,
  extraCacheKeyFactors?: any[],
): Result => {
  const cacheKey = objectHash({ args, extraCacheKeyFactors });
  const recordFilePath = path.resolve(cacheDir, `${cacheKey}.json`);
  let record:
    | { value: Result; error?: undefined }
    | { error: ErrorObject; value?: undefined };
  let recordIsFromCache = false;

  // load value or error from cache
  try {
    record = JSON.parse(fs.readFileSync(recordFilePath, "utf8")) as {
      value: Result;
      error?: undefined;
    };
    recordIsFromCache = true;
  } catch {
    // a failure to load from cache implies calling fn
    try {
      record = {
        value: fn(...args),
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
  } catch (error) {
    // a failure to save record into cache or clean garbage
    // should not affect the result of the function

    /* istanbul ignore next */
    if (process.env["NODE_ENV"] === "test") {
      throw error;
    }
  }

  if ("error" in record) {
    // eslint-disable-next-line unicorn/error-message
    const errorToThrow = new Error() as Error & Record<string, unknown>;
    for (const errorProperty in record.error) {
      /* istanbul ignore else */
      if (Object.prototype.hasOwnProperty.call(record.error, errorProperty)) {
        errorToThrow[errorProperty] = record.error["property"];
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
