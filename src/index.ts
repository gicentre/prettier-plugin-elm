const parse = require("./parser");
const print = require("./printer");

const languages = [
  {
    name: "Elm",
    parsers: ["elm"],
    since: "1.0.0",
    extensions: [".elm"],
    tmScope: "source.elm",
    aceMode: "text",
    linguistLanguageId: 101,
    vscodeLanguageIds: ["elm"]
  }
];

const parsers = {
  elm: {
    parse,
    astFormat: "elm-format",
    // there's only a single node
    locStart(node) {
      return node.start;
    },
    locEnd(node) {
      return node.end;
    }
  }
};

const printers = {
  "elm-format": {
    print
  }
};

module.exports = {
  languages,
  printers,
  parsers,
  defaultOptions: {}
};
