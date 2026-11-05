import upstream from "@changesets/changelog-github";

// Same as @changesets/changelog-github, except that the authors listed in the
// `authorsWithoutThanks` option in config.json do not get a "Thanks" credit.
export default {
  ...upstream,
  getReleaseLine: async (changeset, type, options) => {
    const line = await upstream.getReleaseLine(changeset, type, options);
    const excludedAuthors = options?.authorsWithoutThanks ?? [];

    return line.replace(/ Thanks (\[@.+?)! - /, (_, authors) => {
      const remainingAuthors = authors
        .split(", ")
        .filter(
          (author) =>
            !excludedAuthors.some((name) => author.startsWith(`[@${name}]`)),
        );

      return remainingAuthors.length > 0
        ? ` Thanks ${remainingAuthors.join(", ")}! - `
        : " - ";
    });
  },
};
