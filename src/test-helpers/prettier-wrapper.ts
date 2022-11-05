import type { Options } from "prettier";

type Prettier = typeof import("prettier");
let cachedPrettier: Prettier | undefined;

export const getPrettier = async (): Promise<Prettier> => {
  if (cachedPrettier) {
    return cachedPrettier;
  }

  cachedPrettier = await (process.env.PRETTIER_V3 === "true"
    ? import("prettier-v3")
    : import("prettier"));

  return cachedPrettier;
};

export const format = async (
  source: string,
  options?: Options,
): Promise<string> => {
  const prettier = await getPrettier();

  if (process.env.PRETTIER_V3) {
    // eslint-disable-next-line @typescript-eslint/await-thenable -- v3 are copied from v2
    return await prettier.format(source, options);
  }

  return prettier.format(source, options);
};
