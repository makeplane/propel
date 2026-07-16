# propel

A [Turborepo](https://turborepo.com) + [pnpm](https://pnpm.io) monorepo.

## Docs

- [`docs/design.md`](./docs/design.md) — the shared design + code contract: how we
  name component **properties** and structure component **anatomy**.
- [`docs/integration.md`](./docs/integration.md) — how we adopt propel into Plane:
  the explicit-first rollout, composing primitives with Base UI `render`, and the
  remaining anatomy work.
- [`packages/propel/README.md`](./packages/propel/README.md) — the `@makeplane/propel`
  package: install, usage, and component conventions.

## Prerequisites

- [Node](https://nodejs.org) — the version in [`.node-version`](./.node-version).
- [pnpm](https://pnpm.io) — the version is pinned by `packageManager` in
  `package.json`; enable it with `corepack enable`.

## Workspace layout

```
propel/
├── apps/       # applications (e.g. docs, the Astro docs site)
├── packages/   # shared libraries (e.g. @makeplane/propel)
└── tools/      # internal tooling (e.g. the Oxlint plugin)
```

## Common commands

```bash
pnpm install          # install dependencies
pnpm dev              # run dev servers                 (turbo run dev)
pnpm build            # build all packages              (turbo run build)
pnpm test             # run tests                       (turbo run test)
pnpm check            # check:format + check:lint + check:types
pnpm check:lint       # lint with Oxlint
pnpm check:format     # verify formatting with Oxfmt
pnpm check:types      # type-check
pnpm fix              # auto-fix: fix:format + fix:lint
```

Tasks are orchestrated by [Turborepo](https://turborepo.com) (`turbo.json`). The
underlying tools are [tsdown](https://tsdown.dev) (library builds),
[Vitest](https://vitest.dev) (tests), and [Oxlint](https://oxc.rs) /
[Oxfmt](https://oxc.rs) (lint / format). Run a single package's task with
`pnpm exec turbo run <task> --filter=<package>`.
