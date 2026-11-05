import fs from "node:fs";

// Runs after `changeset version`. The date goes below the heading because
// changesets/action looks up changelog entries by their exact heading text.
const { version } = JSON.parse(fs.readFileSync("package.json", "utf8"));
const changelog = fs.readFileSync("CHANGELOG.md", "utf8");
const date = new Date().toISOString().slice(0, 10);
const heading = `## ${version}\n`;

if (!changelog.includes(`${heading}\n_Released on `)) {
  fs.writeFileSync(
    "CHANGELOG.md",
    changelog.replace(heading, `${heading}\n_Released on ${date}._\n`),
  );
}
