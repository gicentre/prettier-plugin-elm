import type { Options } from "prettier";

export const getPrettier = async () => {
  switch (process.env["PRETTIER_MAJOR_VERSION"]) {
    case "2": {
      return (
        // eslint-disable-next-line @typescript-eslint/consistent-type-imports -- prettier-v2 is untyped, so it borrows the types of the current version
        (await import("prettier-v2")) as typeof import("prettier")
      );
    }
    case "1": {
      return (
        // eslint-disable-next-line @typescript-eslint/consistent-type-imports -- prettier-v1 is untyped, so it borrows the types of the current version
        (await import("prettier-v1")) as typeof import("prettier")
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
