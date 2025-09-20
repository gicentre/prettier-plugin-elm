import fs from "node:fs";
import npmRunPath from "npm-run-path";
import { sync as spawnSync } from "cross-spawn";

let cachedElmFormatVersion: string;

export const getElmFormatVersion = () => {
  if (!cachedElmFormatVersion) {
    // a cleaner way of getting elm-format version
    // will be possible when this issue is closed:
    // https://github.com/avh4/elm-format/issues/425
    const result = spawnSync("elm-format", ["--help"], {
      cwd: __dirname,
      encoding: "utf8",
      env: npmRunPath.env({ cwd: __dirname }),
      timeout: 5000,
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
  const result = spawnSync("elm-format", ["--stdin", "--elm-version=0.19"], {
    cwd: __dirname,
    encoding: "utf8",
    env: npmRunPath.env({ cwd: __dirname }),
    input: text,
    timeout: 15_000,
  });

  if (result.error) {
    throw new Error(`Failed to format Elm code: ${result.error.message}`);
  }

  if (result.status !== 0) {
    const errorOutput = result.stderr || "";
    throw new Error(
      `elm-format failed with exit code ${result.status ?? "null"}: ${errorOutput}`,
    );
  }

  return result.stdout || "";
};
