import type { Parser, Printer } from "prettier";

import { parse } from "./parser";
import { print } from "./printer";
import type { ElmNode } from "./types";

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

export const parsers: Record<string, Parser<ElmNode>> = {
  elm: {
    parse,
    astFormat: "elm-format",
    // there's only a single node
    locStart(node) {
      return node.start;
    },
    locEnd(node) {
      return node.end;
    },
  },
};

export const printers: Record<string, Printer<ElmNode>> = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "elm-format": {
    print,
  },
};
