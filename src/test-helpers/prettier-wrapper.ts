import type { Options } from "prettier";

export const getPrettier = async () => {
  switch (process.env["PRETTIER_MAJOR_VERSION"]) {
    case "2": {
      return (
        // there is a slight type mismatch in format Options between v2 and v3
        (await import("prettier-v2")) as unknown as typeof import("prettier")
      );
    }
    case "1": {
      return (
        // there is a slight type mismatch in format Options between v1 and v3
        (await import("prettier-v1")) as unknown as typeof import("prettier")
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

  return await prettier.format(source, options);
};
