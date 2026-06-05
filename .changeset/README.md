# Changesets

This folder is managed by [Changesets](https://github.com/changesets/changesets).
It tracks pending version bumps and changelog entries for the workspace's
publishable packages.

When you make a change that should ship in a release, run:

```bash
pnpm changeset
```

Pick the affected package(s), the bump type (patch / minor / major), and write a
short summary. That creates a markdown file in this folder which is committed
alongside your change. On merge to `main`, the release workflow opens (or
updates) a "Version Packages" PR that consumes these files, bumps versions,
writes `CHANGELOG.md`, and publishes to npm when merged.

See the [Changesets docs](https://github.com/changesets/changesets/blob/main/docs/intro-to-using-changesets.md)
for the full workflow.
