import type { Options } from "prettier";

export const getPrettier = async (): Promise<typeof import("prettier")> => {
  return process.env.PRETTIER_V3 === "true"
    ? await import("prettier-v3")
    : // eslint-disable-next-line @typescript-eslint/no-var-requires
      (require("prettier") as typeof import("prettier"));
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
