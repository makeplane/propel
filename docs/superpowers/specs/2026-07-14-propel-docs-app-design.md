# Propel docs app — design

**Status:** Approved
**Date:** 2026-07-14

## Summary

Add a new app, `apps/propel-docs`, that serves as a public-facing documentation
site for `@makeplane/propel`'s `components` layer: one page per component with a
live demo, an install snippet, a generated props table, and a short usage
example. Modeled on [cloudflare/kumo](https://github.com/cloudflare/kumo)'s
`packages/kumo-docs-astro`, but scoped down for a first pass.

Storybook remains the internal component-development/testing workshop
(isolated stories, visual regression, a11y checks, the MCP addon). This new
app is the polished, navigable reference site aimed at consumers of the
library — it does not replace Storybook.

## Goals

- One doc page per `components/*` entry, each with:
  - A live, interactive demo (or a few, for variants worth showing separately)
  - Barrel + granular install snippets, matching propel's real `exports` map
  - A props table generated from the component's actual TypeScript types
  - A short usage code example
- Reuse propel's real design tokens/Tailwind setup (not a re-implementation)
- Deployable as a static Cloudflare Workers site
- Fast local dev loop: editing a propel component should hot-reload the docs
  site without a separate build step

## Non-goals (deferred, not in v1)

- Site search
- A changelog page
- A "blocks" section (composed, multi-component patterns)
- An agent-queryable CLI (kumo's `npx @cloudflare/kumo doc Button` equivalent)
- Documenting the `elements` (Base UI primitives) layer — `components` only
- Exporting a public `component-registry.json` artifact from `@makeplane/propel`
  itself (kumo does this; see "Props tables" below for the smaller
  in-app equivalent)
- Writing doc pages for all ~65 existing components — this pass builds the
  template and 6 representative pages; the rest follow the same pattern later

## Reference: how kumo does it

`packages/kumo-docs-astro` in cloudflare/kumo is Astro 5 + `@astrojs/react`
islands + MDX, deployed to Cloudflare via `wrangler.jsonc` (static assets,
no SSR adapter). Key mechanisms worth naming explicitly since propel's version
simplifies two of them:

- **Props data** comes from `@cloudflare/kumo/ai/component-registry.json`, a
  JSON artifact the `kumo` package itself generates at build time and exports
  publicly. The docs site (and a CLI) just read it.
- **Demo source display** (the "view code" panel next to a live demo) is
  produced by slicing one named export out of a shared demo file using the
  TypeScript compiler API (`extract-demo-snippet.ts`), so the snippet shown is
  guaranteed to match the live demo exactly, without hand-duplicating code.
- Dev mode aliases `@cloudflare/kumo` imports to the package's raw `src/`
  (`vite-plugin-kumo-hmr.ts`), so editing a component hot-reloads the docs
  site instantly instead of waiting on a package build.

## Architecture

**Stack:** Astro 7 (per explicit instruction — kumo itself is still on Astro 5) + `@astrojs/react` 6 + `@astrojs/mdx` 7 + Tailwind v4 via
`@tailwindcss/vite` (propel's existing catalog versions) + `@astrojs/sitemap`.
Static output; no SSR adapter. Icons via `lucide-react` (propel's icon set,
not kumo's `@phosphor-icons/react`).

**Directory structure:**

```
apps/propel-docs/
├── astro.config.mjs
├── wrangler.jsonc
├── package.json
├── tsconfig.json
├── src/
│   ├── layouts/
│   │   ├── BaseLayout.astro       # <html>, head, fonts, theme toggle
│   │   └── ComponentLayout.astro  # sidebar nav + content column
│   ├── components/
│   │   ├── SidebarNav.tsx         # component list, from a static registry array
│   │   ├── ComponentExample.astro # demo frame + "view code" toggle
│   │   ├── PropsTable.astro       # renders the extracted prop schema
│   │   └── CodeBlock.astro        # shiki-highlighted snippet
│   ├── demos/
│   │   ├── button/
│   │   │   ├── basic.tsx          # one file per demo variant
│   │   │   └── with-icon.tsx
│   │   ├── input-field/…
│   │   ├── select/…
│   │   ├── dialog/…
│   │   ├── table/…
│   │   └── accordion/…
│   ├── lib/
│   │   └── props-schema.ts        # build-time react-docgen-typescript extraction
│   └── pages/
│       ├── index.astro            # landing page
│       ├── installation.mdx
│       └── components/
│           ├── button.mdx
│           ├── input-field.mdx
│           ├── select.mdx
│           ├── dialog.mdx
│           ├── table.mdx
│           └── accordion.mdx
```

## Content pipeline

### Props tables (simplified from kumo)

Rather than generating and publicly exporting a `component-registry.json`
from `@makeplane/propel` itself (a public-API change), `src/lib/props-schema.ts`
runs `react-docgen-typescript` **inside the docs app** directly against
`packages/propel/src/components/**`, at build/dev time. It reuses the same
extraction options already tuned in `.storybook/main.ts`:
`shouldExtractLiteralValuesFromEnum`, `shouldRemoveUndefinedFromOptional`, and
the `propFilter` that keeps `children` but drops props inherited from
`node_modules` (DOM/Base UI spread props). `PropsTable.astro` takes a
component name and renders whatever `props-schema.ts` resolves for it.

If this proves broadly useful (e.g. for an agent-facing registry later), the
natural follow-up is promoting it into a real export from
`@makeplane/propel` itself, the way kumo does — deliberately not doing that
yet.

### Demo source display (simplified from kumo)

Instead of kumo's TypeScript-AST slicer, **each demo variant is its own
file** under `src/demos/<component>/<variant>.tsx`, default-exporting one
component. An MDX page imports it twice:

```tsx
import BasicDemo from "~/demos/button/basic.tsx";
import basicSource from "~/demos/button/basic.tsx?raw";
```

`BasicDemo` renders live (`client:visible`), `basicSource` feeds
`CodeBlock`/`ComponentExample`'s "view code" panel. This gets the same
guaranteed-accurate-source result as kumo without an AST pipeline, at the
cost of one file per variant instead of many named exports in a shared file
— a fine trade at 6 initial pages, revisitable if the file count gets
unwieldy later.

### Dev-mode source aliasing

`astro.config.mjs`'s Vite config aliases `@makeplane/propel` (and its
`/styles` import) to `packages/propel/src` only when running `astro dev`,
mirroring kumo's `vite-plugin-kumo-hmr.ts`. Production builds resolve the
real `workspace:*` dependency through propel's normal `dist` package exports
— no alias, no behavior difference from a real consumer's install.

## Styling

Reuse propel's actual Tailwind v4 setup: `@tailwindcss/vite` plugin (already
in the pnpm catalog) plus an import of `@makeplane/propel/styles` (aliased to
source in dev, as above) so every token, utility, and component class in the
docs site is the same one a consumer gets — not a re-implementation or a
copy of propel's CSS.

## Deployment

`wrangler.jsonc` mirrors kumo's shape: static assets (`assets.directory:
"./dist"`), no SSR adapter, `observability.enabled: true`. `account_id` and
`routes` are left as placeholders/comments — those are specific to the
Cloudflare account this gets deployed under and aren't invented here.

## Workspace wiring

- Package name: `@makeplane/propel-docs`, private (not published)
- Scripts mirror kumo's docs package: `dev` (`astro dev`), `build` (`astro
build`), `preview` (`astro preview`), `typecheck` (`astro check`) — runnable
  through the existing `vp run -r <script>` convention
- Depends on `@makeplane/propel` via `workspace:*`
- `apps/*` is already declared in `pnpm-workspace.yaml`; no workspace config
  changes needed
- `AGENTS.md`'s existing workspace-layout diagram already documents `apps/`
  as scaffoldable via `vp create`; for Astro specifically that's the remote
  `create-astro` template (`vp create astro`, per `vp create`'s documented
  shorthand-expands-to-`create-*`-packages behavior) rather than the built-in
  `vite:application` template, which only covers Vite's own frameworks. If
  the generated layout doesn't line up with the directory structure above,
  fall back to hand-authoring the config files directly — either way, no
  changes to `AGENTS.md` or `pnpm-workspace.yaml` are needed

## Initial pages (6, spanning distinct patterns)

| Component     | Why it's in the first batch                         |
| ------------- | --------------------------------------------------- |
| `button`      | Simple atom, few variants                           |
| `input-field` | Form-field composition (label + input + error)      |
| `select`      | Complex interactive (popover + list + keyboard nav) |
| `dialog`      | Overlay/portal composition                          |
| `table`       | Data-heavy layout                                   |
| `accordion`   | Disclosure pattern                                  |

Each page: live demo(s) → install (barrel + granular) → usage example →
props table.

## Testing / verification plan

- `vp check` (format + lint + typecheck) across the new app
- `astro check` for Astro/MDX-specific type checking
- `astro build` succeeds and produces static output in `dist/`
- Manually drive `astro dev` in a browser: confirm each of the 6 component
  pages renders its live demo, the "view code" panel matches the demo
  source, the props table lists the real prop types, sidebar nav links work,
  and editing a propel component source file hot-reloads the docs page

## Open follow-ups (explicitly out of scope here)

- The remaining ~59 `components/*` pages, following this same pattern
- Site search
- Changelog page
- Blocks section
- Agent-queryable CLI
- `elements` layer docs
- Promoting `props-schema.ts` into a real exported registry from
  `@makeplane/propel`
