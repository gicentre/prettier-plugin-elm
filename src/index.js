"use strict";

const utilShared = require("prettier").util;
const parse = require("./parser");
const print = require("./printer");

const languages = [
  {
    name: "Elm",
    parsers: ["elm"],
    extensions: [".elm"],
    tmScope: "source.elm",
    aceMode: "text",
    linguistLanguageId: 101,
    vscodeLanguageIds: ["elm"]
  }
];

function locStart(node) {
  // This function is copied from the code that used to live in the main prettier repo.

  // Handle nodes with decorators. They should start at the first decorator
  if (
    node.declaration &&
    node.declaration.decorators &&
    node.declaration.decorators.length > 0
  ) {
    return locStart(node.declaration.decorators[0]);
  }
  if (node.decorators && node.decorators.length > 0) {
    return locStart(node.decorators[0]);
  }

  if (node.__location) {
    return node.__location.startOffset;
  }
  if (node.range) {
    return node.range[0];
  }
  if (typeof node.start === "number") {
    return node.start;
  }
  if (node.source) {
    return (
      utilShared.lineColumnToIndex(node.source.start, node.source.input.css) - 1
    );
  }
  if (node.loc) {
    return node.loc.start;
  }
}

function locEnd(node) {
  // This function is copied from the code that used to live in the main prettier repo.

  const endNode = node.nodes && utilShared.getLast(node.nodes);
  if (endNode && node.source && !node.source.end) {
    node = endNode;
  }

  let loc;
  if (node.range) {
    loc = node.range[1];
  } else if (typeof node.end === "number") {
    loc = node.end;
  } else if (node.source) {
    loc = utilShared.lineColumnToIndex(node.source.end, node.source.input.css);
  }

  if (node.__location) {
    return node.__location.endOffset;
  }
  if (node.typeAnnotation) {
    return Math.max(loc, locEnd(node.typeAnnotation));
  }

  if (node.loc && !loc) {
    return node.loc.end;
  }

  return loc;
}

const parsers = {
  python: {
    parse,
    astFormat: "elm-format",
    locStart: locStart,
    locEnd: locEnd
  }
};

const options = {};

function canAttachComment(node) {
  return node.ast_type && node.ast_type !== "comment";
}

function printComment(commentPath) {
  const comment = commentPath.getValue();

  switch (comment.ast_type) {
    case "comment":
      return comment.value;
    default:
      throw new Error("Not a comment: " + JSON.stringify(comment));
  }
}

function clean(ast, newObj) {
  delete newObj.lineno;
  delete newObj.col_offset;
}

const printers = {
  "elm-format": {
    print,
    printComment,
    canAttachComment,
    massageAstNode: clean
  }
};

module.exports = {
  languages,
  printers,
  parsers,
  options,
  defaultOptions: {}
};
