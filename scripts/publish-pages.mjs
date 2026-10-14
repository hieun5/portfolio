import { spawnSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function run(command, args, cwd = root, capture = false) {
  const result = spawnSync(command, args, {
    cwd,
    encoding: "utf8",
    stdio: capture ? "pipe" : "inherit",
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    // Git may report proxy/authentication failures; no credential values are logged here.
    if (capture && result.stderr) process.stderr.write(result.stderr);
    throw new Error(`${command} ${args[0]} failed (exit ${result.status}).`);
  }
  return result.stdout?.trim() ?? "";
}

run("npm", ["run", "build:pages"]);
const origin = run("git", ["remote", "get-url", "origin"], root, true);
const name = run("git", ["config", "--get", "user.name"], root, true);
const email = run("git", ["config", "--get", "user.email"], root, true);
const remoteBranch = run(
  "git",
  ["ls-remote", "--heads", "origin", "refs/heads/gh-pages"],
  root,
  true,
);
const checkout = mkdtempSync(join(tmpdir(), "hieu-pages-"));

try {
  if (remoteBranch) {
    run("git", [
      "clone",
      "--quiet",
      "--single-branch",
      "--branch",
      "gh-pages",
      "--depth",
      "1",
      origin,
      checkout,
    ]);
    // Protect a branch containing application source or unrelated user files.
    const allowed = new Set([
      "assets",
      "projects",
      "index.html",
      "favicon.svg",
      ".nojekyll",
      "CNAME",
      "404.html",
    ]);
    const unexpected = readdirSync(checkout).filter(
      (entry) => entry !== ".git" && !allowed.has(entry),
    );
    if (unexpected.length)
      throw new Error(
        `The gh-pages branch has unexpected files: ${unexpected.join(", ")}. Review them before deploying.`,
      );
  } else {
    run("git", ["init", "--quiet", "--initial-branch=gh-pages"], checkout);
    run("git", ["remote", "add", "origin", origin], checkout);
  }

  const cnamePath = join(checkout, "CNAME");
  const cname = existsSync(cnamePath) ? readFileSync(cnamePath) : null;
  for (const entry of readdirSync(checkout)) {
    if (entry !== ".git")
      rmSync(join(checkout, entry), { recursive: true, force: true });
  }
  for (const entry of readdirSync(join(root, "dist"))) {
    cpSync(join(root, "dist", entry), join(checkout, entry), {
      recursive: true,
    });
  }
  writeFileSync(join(checkout, ".nojekyll"), "");
  if (cname) writeFileSync(cnamePath, cname);

  run("git", ["config", "user.name", name], checkout);
  run("git", ["config", "user.email", email], checkout);
  run("git", ["add", "--all"], checkout);
  const diff = spawnSync("git", ["diff", "--cached", "--quiet"], {
    cwd: checkout,
  });
  if (diff.status === 0) {
    console.log("The gh-pages build is already up to date.");
  } else if (diff.status === 1) {
    run(
      "git",
      ["commit", "--quiet", "-m", "Deploy portfolio to GitHub Pages"],
      checkout,
    );
    // An ordinary push preserves remote history and rejects concurrent changes.
    run("git", ["push", "origin", "HEAD:gh-pages"], checkout);
    console.log(
      "Built files pushed to gh-pages. Enable GitHub Pages in repository settings to publish the website.",
    );
  } else {
    throw new Error("Could not inspect the staged deployment changes.");
  }
} finally {
  rmSync(checkout, { recursive: true, force: true });
}
