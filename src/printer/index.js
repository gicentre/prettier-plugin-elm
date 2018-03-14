"use strict";

function genericPrint(path) {
  const n = path.getValue();
  if (!n) {
    return "";
  }

  switch (n.ast_type) {
    case "ElmFormat": {
      return n.body;
    }
    /* istanbul ignore next */
    default:
      if (process.env.NODE_ENV === "test") {
        throw "Unknown Elm node: " +
          JSON.stringify(n, null /*replacer*/, 4 /*space*/);
      }
      // eslint-disable-next-line no-console
      console.error("Unknown Elm node:", n);
      return n.source;
  }
}

module.exports = genericPrint;
