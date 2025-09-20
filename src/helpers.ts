import execa from "execa";

let cachedElmFormatVersion: string;

export const getElmFormatVersion = () => {
  if (!cachedElmFormatVersion) {
    // a cleaner way of getting elm-format version
    // will be possible when this issue is closed:
    // https://github.com/avh4/elm-format/issues/425
    const help = execa.sync("elm-format", ["--help"], {
      preferLocal: true,
      localDir: __dirname,
      timeout: 5000,
    }).stdout;
    const helpMatch = help.match(/elm-format ([^\n]+)/);
    cachedElmFormatVersion = helpMatch?.[1] ?? "unknown";
  }

  return cachedElmFormatVersion;
};

export const formatTextWithElmFormat = (text: string): string => {
  return execa.sync("elm-format", ["--stdin", "--elm-version=0.19"], {
    input: text,
    preferLocal: true,
    localDir: __dirname,
    stripFinalNewline: false,
    timeout: 15_000,
  }).stdout;
};
