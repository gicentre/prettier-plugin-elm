"use strict";

function genericPrint(path) {
  const node = path.getValue();

  switch (node.ast_type) {
    case "elm-format": {
      return node.body;
    }
    /* istanbul ignore next */
    default:
      if (process.env.NODE_ENV === "test") {
        throw "Unknown Elm node: " +
          JSON.stringify(node, null /*replacer*/, 4 /*space*/);
      }
      // eslint-disable-next-line no-console
      console.error("Unknown Elm node:", node);
      return node.source;
  }
}

module.exports = genericPrint;
