# @makeplane/propel-docs

The documentation site for `@makeplane/propel`'s components. Built with Astro 7,
React islands (via `@astrojs/react`), and MDX for the component pages, styled
with propel's own Tailwind v4 tokens (`@makeplane/propel/styles`).

## Commands

Run these from the repo root:

- `pnpm --filter @makeplane/propel-docs dev` — starts the dev server. In dev
  mode, `astro.config.mjs` aliases `@makeplane/propel/components/*` and
  `@makeplane/propel/styles` directly to propel's `src`, so editing a propel
  component hot-reloads this site instantly — no propel build needed.
- `pnpm exec turbo run build --filter @makeplane/propel-docs` — production build.
  Turbo's `^build` builds `@makeplane/propel`'s `dist` first, then this app runs
  `astro build`, so the site resolves propel through its real, published `dist`
  exports — the same way a consumer of the package would.
- `pnpm exec turbo run typecheck --filter @makeplane/propel-docs` — runs
  `astro check` (Turbo builds propel first, same as `build`).
- `pnpm --filter @makeplane/propel-docs preview` — serves the built `dist`
  output locally for a final check before deploying.

## IMPORTANT: the deploy seam

The production build resolves `@makeplane/propel` through its built `dist`,
and `packages/propel/dist` is gitignored — it is not committed. Any CI or
Cloudflare build **must build propel before the site**. Running the build through
Turbo (`turbo run build`) handles this: the `^build` dependency in `turbo.json`
builds propel's `dist` before this app's `astro build`. A bare `astro build` on a
fresh checkout will fail to resolve `@makeplane/propel/components/*`, since no
`dist` exists yet.

## Deployment placeholders

`astro.config.mjs`'s `site` and `wrangler.jsonc`'s `account_id` / `routes` are
intentional TODO placeholders, to be filled in once a real domain and
Cloudflare account are assigned. The sitemap integration (`@astrojs/sitemap`)
reads `site` to generate absolute URLs, so update `site` and rebuild once the
domain is set.

## Adding a component page

1. Create `src/demos/<name>/<variant>.tsx` — a small React demo that imports
   only from `@makeplane/propel/components/<name>` and `lucide-react`, and
   passes every required prop.
2. Create `src/pages/components/<name>.mdx` following the existing pages:
   frontmatter with `layout: ~/layouts/ComponentLayout.astro` plus `title` and
   `description`; import each demo twice (once as the live component with
   `client:visible`, once with a `?raw` suffix for the source snippet);
   render it inside `<ComponentExample>`, add an "Installation" snippet, and
   render `<PropsTable parts={[{ source, component }]} />` for the props
   table.
3. Add the page's entry (`slug`, `title`, `description`) to
   `src/lib/components-registry.ts`.
