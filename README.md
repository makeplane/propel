# propel

A [Vite+](https://viteplus.dev) monorepo.

## Docs

- [`design.md`](./design.md) — the shared design + code contract: how we name
  component **properties** and structure component **anatomy**.
- [`integration.md`](./integration.md) — how we adopt propel into Plane: the
  explicit-first rollout, composing primitives with Base UI `render`, and the
  remaining anatomy work.
- [`packages/propel/README.md`](./packages/propel/README.md) — the `@plane/propel`
  package: install, usage, and component conventions.

## Prerequisites

Install the `vp` CLI globally:

```bash
# macOS / Linux
curl -fsSL https://vite.plus | bash

# Windows (PowerShell)
irm https://vite.plus/ps1 | iex
```

## Workspace layout

```
propel/
├── apps/       # applications (scaffold with `vp create vite:application`)
├── packages/   # shared libraries (scaffold with `vp create vite:library`)
└── tools/      # generators (scaffold with `vp create vite:generator`)
```

## Common commands

```bash
vp install            # install dependencies
vp dev                # run dev servers
vp check              # format + lint + type-check
vp test               # run tests via Vitest
vp build              # production build via Rolldown
vp run -r <task>      # run task across all workspace packages
```

Run `vp help` for the full command list.
