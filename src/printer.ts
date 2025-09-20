import type { AstPath, Doc } from "prettier";

import type { ElmNode } from "./types";

export const print = (path: AstPath<ElmNode>): Doc => {
  const node = path.getValue();

  switch (node.type) {
    case "elm-format": {
      return node.body;
    }

    /* istanbul ignore next */
    default: {
      if (process.env.NODE_ENV === "test") {
        throw new Error(
          `Unknown Elm node: ${JSON.stringify(
            node,
            undefined /* replacer */,
            4 /* space */,
          )}`,
        );
      }
      // eslint-disable-next-line no-console -- TODO: Consider refactoring if error logging is an issue
      console.error("Unknown Elm node:", node);

      return node.source;
    }
  }
};
