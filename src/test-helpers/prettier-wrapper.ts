import type { Options } from "prettier";

type Prettier = typeof import("prettier");
let cachedPrettier: Prettier | undefined;

export const getPrettier = (): Prettier => {
  if (cachedPrettier) {
    return cachedPrettier;
  }

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  cachedPrettier = require(process.env.PRETTIER_V3 === "true"
    ? "prettier-v3"
    : "prettier") as Prettier;

  return cachedPrettier;
};

export const format = async (
  source: string,
  options?: Options,
): Promise<string> => {
  const prettier = getPrettier();

  if (process.env.PRETTIER_V3) {
    // eslint-disable-next-line @typescript-eslint/await-thenable -- v3 are copied from v2
    return await prettier.format(source, options);
  }

  return prettier.format(source, options);
};
