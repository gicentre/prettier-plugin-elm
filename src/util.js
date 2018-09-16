"use strict";

const execa = require("execa");

let cachedElmFormatVersion;
function getElmFormatVersion() {
  if (!cachedElmFormatVersion) {
    // a cleaner way of getting elm-format version
    // will be possible when this issue is closed:
    // https://github.com/avh4/elm-format/issues/425
    const help = execa.sync("elm-format", ["--help"]).stdout;
    cachedElmFormatVersion = help.match(/elm-format ([^\n]+)/)[1];
  }
  return cachedElmFormatVersion;
}

function formatTextWithElmFormat(text) {
  return execa.sync("elm-format", ["--stdin", "--elm-version=0.19"], {
    input: text,
    preferLocal: true,
    localDir: __dirname,
    stripEof: false
  }).stdout;
}

module.exports = {
  getElmFormatVersion,
  formatTextWithElmFormat
};
