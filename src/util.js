"use strict";

const execa = require("execa");

function formatTextWithElmFormat(text) {
  return execa.sync("elm-format", ["--stdin"], {
    input: text,
    preferLocal: true,
    localDir: __dirname,
    stripEof: false
  }).stdout;
}

module.exports = {
  formatTextWithElmFormat
};
