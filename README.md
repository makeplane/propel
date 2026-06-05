# propel

A [Vite+](https://viteplus.dev) monorepo.

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
