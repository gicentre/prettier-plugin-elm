# Releasing

Releases use [changesets](https://github.com/changesets/changesets): merging to `main` never publishes directly.
The release workflow keeps a "Version packages" pull request up to date with pending changesets.
Merging that pull request bumps the version, and the workflow run that follows publishes to npm with a provenance attestation.
No npm token is involved: the workflow authenticates via [trusted publishing](https://docs.npmjs.com/trusted-publishers/).

## Day-to-day

Every user-visible change lands with a changeset (`pnpm changeset`).
While this package is below v1, a breaking change is a `minor` bump, and its description starts with `**[breaking change]**`.

Changelog entries link the pull request that carried the change and thank its author, except for the authors listed under `authorsWithoutThanks` in `.changeset/config.json`.
Looking those links up needs the GitHub API, so `changeset version` requires `GITHUB_TOKEN`.
The release workflow takes care of that.
To preview the result locally, run `GITHUB_TOKEN=$(gh auth token) pnpm changesets:version`.

Pull requests created by the workflow do not trigger CI on their own.
This is fine for a "Version packages" pull request because it only changes the version and the changelog, and the release workflow runs lint and tests again before publishing.

## One-time setup

These steps need access that the workflow itself does not have:

1.  **Trusted publisher**: on npmjs.com, go to package `prettier-plugin-elm` → Settings → Trusted publishing and add a GitHub Actions publisher:

    - Organization or user: `gicentre`
    - Repository: `prettier-plugin-elm`
    - Workflow filename: `release.yml`
    - Environment name: `release`
    - Allowed actions: tick "Allow npm publish" despite the warning next to it, because `changeset publish` publishes directly rather than staging a version

1.  **GitHub environment**: in repository Settings → Environments, create `release` (the workflow declares `environment: release`).

1.  **Workflow permissions**: in repository Settings → Actions → General → Workflow permissions, tick "Allow GitHub Actions to create and approve pull requests".
    Without it, the workflow cannot open the "Version packages" pull request.

## Provenance

`publishConfig.provenance` is set, so publishes from the workflow attach a provenance attestation.
Local publishes cannot generate one (there is no CI identity), so they need `--provenance=false`.
