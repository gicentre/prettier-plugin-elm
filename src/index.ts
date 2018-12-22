import { parse } from "./parser";
import { print } from "./printer";

export const defaultOptions = {};

export const languages = [
  {
    name: "Elm",
    parsers: ["elm"],
    since: "1.0.0",
    extensions: [".elm"],
    tmScope: "source.elm",
    aceMode: "text",
    linguistLanguageId: 101,
    vscodeLanguageIds: ["elm"],
  },
];

export const parsers = {
  elm: {
    parse,
    astFormat: "elm-format",
    // there's only a single node
    locStart(node: any) {
      return node.start;
    },
    locEnd(node: any) {
      return node.end;
    },
  },
};

export const printers = {
  "elm-format": {
    print,
  },
};
