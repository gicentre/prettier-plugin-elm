import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import fs from "node:fs";

const findElmFormat = (): string => {
  const localElmFormat = resolve(
    __dirname,
    "..",
    "node_modules",
    ".bin",
    "elm-format",
  );

  try {
    if (fs.existsSync(localElmFormat)) {
      return localElmFormat;
    }
  } catch {
    // Ignore errors and fall back to global
  }

  return "elm-format";
};

let cachedElmFormatVersion: string;

export const getElmFormatVersion = () => {
  if (!cachedElmFormatVersion) {
    // a cleaner way of getting elm-format version
    // will be possible when this issue is closed:
    // https://github.com/avh4/elm-format/issues/425
    const elmFormatPath = findElmFormat();
    const result = spawnSync(elmFormatPath, ["--help"], {
      cwd: __dirname,
      timeout: 5000,
      encoding: "utf8",
    });

    if (result.error) {
      cachedElmFormatVersion = "unknown";
    } else {
      const help = result.stdout || "";
      const helpMatch = help.match(/elm-format ([^\n]+)/);
      cachedElmFormatVersion = helpMatch?.[1] ?? "unknown";
    }
  }

  return cachedElmFormatVersion;
};

export const formatTextWithElmFormat = (text: string): string => {
  const elmFormatPath = findElmFormat();
  const result = spawnSync(elmFormatPath, ["--stdin", "--elm-version=0.19"], {
    input: text,
    cwd: __dirname,
    timeout: 15_000,
    encoding: "utf8",
  });

  if (result.error) {
    throw new Error(`Failed to format Elm code: ${result.error.message}`);
  }

  if (result.status !== 0) {
    const errorOutput = result.stderr || "";
    throw new Error(
      `elm-format failed with exit code ${result.status}: ${errorOutput}`,
    );
  }

  return result.stdout || "";
};
