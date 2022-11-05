import type { Options } from "prettier";

export const getPrettier = async () => {
  switch (process.env.PRETTIER_VERSION) {
    case "2": {
      return await import("prettier-v2");
    }
    case "1": {
      return (await import(
        "prettier-v1"
      )) as unknown as typeof import("prettier-v2"); // format() options slightly vary between Prettier 1 and 2
    }
    default: {
      return await import("prettier");
    }
  }
};

export const format = async (
  source: string,
  options?: Options,
): Promise<string> => {
  const prettier = await getPrettier();

  if (process.env.PRETTIER_VERSION) {
    return prettier.format(source, options);
  }

  // eslint-disable-next-line @typescript-eslint/await-thenable -- v3 are currently copied from v2
  return await prettier.format(source, options);
};
