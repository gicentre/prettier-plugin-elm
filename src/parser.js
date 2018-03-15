"use strict";

const spawnSync = require("child_process").spawnSync;

function formatText(text) {
  const executionResult = spawnSync("elm-format", ["--stdin"], {
    input: text
  });

  const error = executionResult.stderr.toString();

  if (error) {
    throw new Error(error);
  }

  return executionResult;
}

function parse(text) {
  const executionResult = formatText(text);

  const res = executionResult.stdout.toString();
  return {
    ast_type: "elm-format",
    body: res,
    comments: [],
    end: text.length,
    source: text,
    start: 0
  };
}

module.exports = parse;
