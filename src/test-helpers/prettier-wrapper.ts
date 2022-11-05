import type { Options } from "prettier";

export const getPrettier = async () => {
  const prettier = await (process.env.PRETTIER_VERSION === "3"
    ? import("prettier-v3")
    : process.env.PRETTIER_VERSION === "1"
    ? import("prettier-v1")
    : import("prettier"));

  return prettier as typeof import("prettier");
};

export const format = async (
  source: string,
  options?: Options,
): Promise<string> => {
  const prettier = await getPrettier();

  if (process.env.PRETTIER_VERSION === "3") {
    // eslint-disable-next-line @typescript-eslint/await-thenable -- v3 are copied from v2
    return await prettier.format(source, options);
  }

  return prettier.format(source, options);
};
