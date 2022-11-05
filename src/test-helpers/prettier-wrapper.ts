import type { Options } from "prettier";

export const getPrettier = async () => {
  switch (process.env.PRETTIER_MAJOR_VERSION) {
    case "2": {
      return await import("prettier-v2");
    }
    case "1": {
      return (
        // there is a slight type mismatch in format Options between v1 and v2
        (await import("prettier-v1")) as unknown as typeof import("prettier-v2")
      );
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

  if (prettier.version < "3.0.0") {
    return prettier.format(source, options);
  }

  // eslint-disable-next-line @typescript-eslint/await-thenable -- v3 typings are currently copied from v2
  return await prettier.format(source, options);
};
