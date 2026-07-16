# Propel Docs App Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up `apps/propel-docs`, an Astro 7 documentation site for `@makeplane/propel`'s `components` layer, with live demos, generated props tables, and install snippets for 6 representative components (button, input-field, select, dialog, table, accordion).

**Architecture:** Astro 7 with `@astrojs/react` islands (hydrated only for live demos via `client:visible`) and `@astrojs/mdx` (one `.mdx` page per component). Tailwind v4 and propel's real design tokens are wired in through `@makeplane/propel/styles`, with a dev-mode Vite alias resolving `@makeplane/propel/*` straight to `packages/propel/src` for instant HMR. Props tables are generated at build/render time by running `react-docgen-typescript` directly against propel's source, reusing the exact extraction options already proven in `packages/propel/.storybook/main.ts`. Static output, deployed as Cloudflare Workers static assets.

**Tech Stack:** Astro `^7.0.9`, `@astrojs/react` `^6.0.1`, `@astrojs/mdx` `^7.0.3`, `@astrojs/sitemap` `^3.7.3`, `@astrojs/check` `^0.9.9`, Tailwind v4 (`tailwindcss`/`@tailwindcss/vite`, pnpm catalog), `react-docgen-typescript` `^2.4.0`, `wrangler` `^4.110.0`, React 19 (`^19.2.7`).

## Global Constraints

- Astro version is **7**, not 5 (kumo's own version) — explicit user instruction.
- Only the `components` layer is documented, not `elements` (design spec, "Non-goals").
- No search, changelog, blocks section, or CLI in this pass (design spec, "Non-goals").
- Exactly 6 initial component pages: `button`, `input-field`, `select`, `dialog`, `table`, `accordion` (design spec, "Initial pages").
- One file per demo variant (e.g. `demos/button/basic.tsx`), never multiple named exports sharing a file — each is imported twice, once live and once via `?raw` (design spec, "Demo source display").
- Props tables are produced by a docs-app-local `react-docgen-typescript` script, **not** a new public export from `@makeplane/propel` — no changes to `packages/propel/package.json` (design spec, "Props tables").
- `react-docgen-typescript` options must exactly match `packages/propel/.storybook/main.ts`'s `reactDocgenTypescriptOptions` (`shouldExtractLiteralValuesFromEnum: true`, `shouldRemoveUndefinedFromOptional: true`, the `propFilter` keeping `children` but dropping `node_modules`-inherited props) — that exact config is already proven against propel's `StrictVariantProps`-derived union types in Storybook's own working Docs prop table.
- Dev-mode alias resolves `@makeplane/propel` imports straight to `packages/propel/src`; production builds resolve the real `workspace:*` dependency through propel's normal `dist` exports — no alias in production (design spec, "Dev-mode source aliasing").
- **`@makeplane/propel` has no root barrel** (confirmed in `packages/propel/README.md`: "No root barrel. Each component lives in `src/components/<name>/index.ts`... no barrel to maintain"). Every install snippet and demo import in this plan uses the granular subpath form only, e.g. `@makeplane/propel/components/button` — never a bare `@makeplane/propel` import.
- Every TypeScript prop type in this plan's own code (`.ts`, `.tsx`, and `.astro` frontmatter) uses `type X = {...}`, never `interface X {...}` — repo-wide oxlint rule `typescript/consistent-type-definitions: ["error", "type"]` in the root `vite.config.ts` applies to the whole workspace, including `apps/*`.
- Reuse pnpm catalog versions (`catalog:`) for any dependency already in `pnpm-workspace.yaml`'s `catalog` block (`tailwindcss`, `@tailwindcss/vite`, `@types/node`, `typescript`, `lucide-react`); pin exact versions directly for everything Astro-specific, matching this plan's Tech Stack versions.
- Use propel's real, verified theme utility classes only: `bg-canvas`, `bg-surface-1`, `bg-surface-2`, `text-primary`, `text-secondary`, `text-tertiary`, `border-subtle`, `bg-accent-primary`, `text-on-color` (all confirmed present in `packages/propel/src/styles/variables.css`'s `@theme inline` block). Theme is fixed to `data-theme="light"` on `<html>` — no theme toggle in this pass.
- Run `vp check --fix` and confirm `astro check` passes with zero errors before each task's commit.

---

### Task 1: Scaffold the Astro app skeleton

**Files:**

- Create: `apps/propel-docs/package.json`
- Create: `apps/propel-docs/tsconfig.json`
- Create: `apps/propel-docs/astro.config.mjs`
- Create: `apps/propel-docs/wrangler.jsonc`
- Create: `apps/propel-docs/public/favicon.svg`
- Create: `apps/propel-docs/src/pages/index.astro`

**Interfaces:**

- Produces: a working `astro dev` / `astro build` / `astro check` toolchain at `apps/propel-docs`, the `~/*` → `./src/*` path alias (used by every later task's imports), and the dev-mode `@makeplane/propel` → `packages/propel/src` Vite alias (used by every component page task).

- [ ] **Step 1: Create `apps/propel-docs/package.json`**

```json
{
  "name": "@makeplane/propel-docs",
  "version": "0.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "typecheck": "astro check"
  },
  "dependencies": {
    "@astrojs/mdx": "^7.0.3",
    "@astrojs/react": "^6.0.1",
    "@astrojs/sitemap": "^3.7.3",
    "@makeplane/propel": "workspace:*",
    "@tailwindcss/vite": "catalog:",
    "astro": "^7.0.9",
    "lucide-react": "catalog:",
    "react": "^19.2.7",
    "react-dom": "^19.2.7",
    "tailwindcss": "catalog:"
  },
  "devDependencies": {
    "@astrojs/check": "^0.9.9",
    "@types/node": "catalog:",
    "@types/react": "^19.2.17",
    "@types/react-dom": "^19.2.3",
    "react-docgen-typescript": "^2.4.0",
    "typescript": "catalog:",
    "wrangler": "^4.110.0"
  }
}
```

- [ ] **Step 2: Create `apps/propel-docs/tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "~/*": ["./src/*"]
    }
  }
}
```

- [ ] **Step 3: Create `apps/propel-docs/astro.config.mjs`**

```js
// @ts-check
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

// Dev-mode alias to propel's real source, so editing a component hot-reloads
// this docs site without needing `vp pack --watch` running in parallel.
// Production builds resolve `@makeplane/propel` through its normal workspace
// package + dist exports instead (no alias).
const isDev = process.argv.includes("dev");
const propelSrc = resolve(__dirname, "../../packages/propel/src");

export default defineConfig({
  // TODO: replace with the real deployed domain once one is assigned.
  site: "https://propel-docs.example.com",
  integrations: [mdx(), react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
    resolve: isDev
      ? {
          alias: [
            {
              find: /^@makeplane\/propel\/components\/(.*)$/,
              replacement: resolve(propelSrc, "components/$1/index.tsx"),
            },
            {
              find: "@makeplane/propel/styles",
              replacement: resolve(propelSrc, "styles/propel.css"),
            },
          ],
        }
      : undefined,
  },
});
```

- [ ] **Step 4: Create `apps/propel-docs/wrangler.jsonc`**

```jsonc
{
  "$schema": "./node_modules/wrangler/config-schema.json",
  "name": "propel-docs",
  // TODO: set account_id and a real routes/zone entry before deploying.
  "compatibility_date": "2026-07-15",
  "assets": {
    "directory": "./dist",
  },
  "observability": {
    "enabled": true,
  },
}
```

- [ ] **Step 5: Create `apps/propel-docs/public/favicon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="8" fill="#3b82f6" />
  <text x="16" y="22" font-family="system-ui, sans-serif" font-size="18" font-weight="700" fill="white" text-anchor="middle">P</text>
</svg>
```

- [ ] **Step 6: Create a minimal boot page at `apps/propel-docs/src/pages/index.astro`**

```astro
---
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Propel docs</title>
  </head>
  <body>
    <p>Propel docs — scaffold OK.</p>
  </body>
</html>
```

- [ ] **Step 7: Install and boot the dev server**

Run: `vp install` (from the repo root — this links `@makeplane/propel: workspace:*` and installs
the new app's own dependencies)
Expected: install completes with no errors.

Run: `pnpm --filter @makeplane/propel-docs dev`
Expected: Astro prints a local dev URL (e.g. `http://localhost:4321/`) with no errors. Load it in a browser and confirm the "Propel docs — scaffold OK." text renders.

Stop the dev server (Ctrl+C) once confirmed.

- [ ] **Step 8: Commit**

```bash
git add apps/propel-docs
git commit -m "Scaffold apps/propel-docs Astro app"
```

---

### Task 2: Wire Tailwind v4 + propel's design tokens, build the real landing page

**Files:**

- Create: `apps/propel-docs/src/styles/global.css`
- Create: `apps/propel-docs/src/layouts/BaseLayout.astro`
- Modify: `apps/propel-docs/src/pages/index.astro`

**Interfaces:**

- Consumes: the dev-mode alias from Task 1 (`@makeplane/propel/styles` → propel's source CSS).
- Produces: `BaseLayout.astro` with props `{ title: string; description?: string }`, imported by every later layout and page.

- [ ] **Step 1: Create `apps/propel-docs/src/styles/global.css`**

```css
@import "tailwindcss";
@import "@makeplane/propel/styles";
```

- [ ] **Step 2: Create `apps/propel-docs/src/layouts/BaseLayout.astro`**

```astro
---
import "../styles/global.css";

type Props = {
  title: string;
  description?: string;
};

const { title, description } = Astro.props;
---

<!doctype html>
<html lang="en" data-theme="light">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <title>{title} · Propel</title>
    {description ? <meta name="description" content={description} /> : null}
  </head>
  <body class="bg-canvas text-primary">
    <slot />
  </body>
</html>
```

- [ ] **Step 3: Replace `apps/propel-docs/src/pages/index.astro` with the real landing page**

```astro
---
import BaseLayout from "~/layouts/BaseLayout.astro";
---

<BaseLayout title="Propel" description="Documentation for @makeplane/propel's React components.">
  <main class="mx-auto flex max-w-3xl flex-col gap-10 px-6 py-16">
    <div>
      <h1 class="text-3xl font-semibold text-primary">Propel</h1>
      <p class="mt-3 text-lg text-secondary">
        Plane's React component library, built on Base UI and Tailwind CSS v4.
      </p>
    </div>
    <div class="flex gap-3">
      <a href="/installation" class="rounded-md bg-accent-primary px-4 py-2 text-sm font-medium text-on-color">
        Get started
      </a>
    </div>
  </main>
</BaseLayout>
```

- [ ] **Step 4: Verify the tokens actually loaded**

Run: `pnpm --filter @makeplane/propel-docs dev`
Expected: no errors resolving `@makeplane/propel/styles`.

Open the dev URL in a browser. Confirm:

- The page background is propel's canvas color (a light gray, not pure white) and body text is propel's dark text color — this proves `@theme inline` tokens from `packages/propel/src/styles/variables.css` are loaded, not default Tailwind black-on-white.
- The "Get started" link has a solid blue-ish accent background with white text (`bg-accent-primary` / `text-on-color`).

If the page is unstyled black-on-white, stop and check the `@import "@makeplane/propel/styles"` path in `global.css` and the dev alias in `astro.config.mjs` before proceeding.

Stop the dev server once confirmed.

- [ ] **Step 5: Commit**

```bash
git add apps/propel-docs
git commit -m "Wire Tailwind v4 + propel design tokens into propel-docs"
```

---

### Task 3: Layouts, sidebar nav, and the installation page

**Files:**

- Create: `apps/propel-docs/src/lib/components-registry.ts`
- Create: `apps/propel-docs/src/components/SidebarNav.astro`
- Create: `apps/propel-docs/src/layouts/ComponentLayout.astro`
- Modify: `apps/propel-docs/src/pages/index.astro`
- Create: `apps/propel-docs/src/pages/installation.mdx`

**Interfaces:**

- Consumes: `BaseLayout` from Task 2 (`{ title, description }` props).
- Produces: `COMPONENTS: ComponentEntry[]` (`{ slug: string; title: string; description: string }`) from `~/lib/components-registry`, consumed by `SidebarNav.astro`, `index.astro`, and every component page task (5-9) via the `layout: ~/layouts/ComponentLayout.astro` MDX frontmatter field, which accepts `{ title: string; description?: string }`.

- [ ] **Step 1: Create `apps/propel-docs/src/lib/components-registry.ts`**

```ts
export type ComponentEntry = {
  slug: string;
  title: string;
  description: string;
};

export const COMPONENTS: ComponentEntry[] = [
  {
    slug: "button",
    title: "Button",
    description: "Triggers an action or event, such as submitting a form or opening a dialog.",
  },
  {
    slug: "input-field",
    title: "Input Field",
    description: "A labeled single-line text field with optional hint and error messaging.",
  },
  {
    slug: "select",
    title: "Select",
    description: "Lets a user choose one option from a list in a popup.",
  },
  {
    slug: "dialog",
    title: "Dialog",
    description: "A modal overlay for focused tasks and confirmations.",
  },
  {
    slug: "table",
    title: "Table",
    description: "Displays rows of data in columns, with optional sortable and pinned headers.",
  },
  {
    slug: "accordion",
    title: "Accordion",
    description: "A vertically stacked set of panels that expand and collapse one at a time.",
  },
];
```

- [ ] **Step 2: Create `apps/propel-docs/src/components/SidebarNav.astro`**

```astro
---
import { COMPONENTS } from "~/lib/components-registry";

const currentPath = Astro.url.pathname.replace(/\/$/, "");
---

<nav class="w-56 shrink-0">
  <p class="mb-3 text-xs font-medium tracking-wide text-tertiary uppercase">Components</p>
  <ul class="flex flex-col gap-1">
    {
      COMPONENTS.map((entry) => {
        const href = `/components/${entry.slug}`;
        const isActive = currentPath === href;
        return (
          <li>
            <a
              href={href}
              class={`block rounded-md px-3 py-1.5 text-sm ${
                isActive
                  ? "bg-surface-2 text-primary"
                  : "text-secondary hover:bg-surface-1 hover:text-primary"
              }`}
            >
              {entry.title}
            </a>
          </li>
        );
      })
    }
  </ul>
</nav>
```

- [ ] **Step 3: Create `apps/propel-docs/src/layouts/ComponentLayout.astro`**

```astro
---
import SidebarNav from "~/components/SidebarNav.astro";
import BaseLayout from "~/layouts/BaseLayout.astro";

type Props = {
  title: string;
  description?: string;
};

const { title, description } = Astro.props;
---

<BaseLayout title={title} description={description}>
  <div class="mx-auto flex max-w-6xl gap-10 px-6 py-10">
    <SidebarNav />
    <main class="min-w-0 flex-1">
      <header class="mb-8 border-b border-subtle pb-6">
        <h1 class="text-2xl font-semibold text-primary">{title}</h1>
        {description ? <p class="mt-2 text-secondary">{description}</p> : null}
      </header>
      <div class="flex flex-col gap-10">
        <slot />
      </div>
    </main>
  </div>
</BaseLayout>
```

- [ ] **Step 4: Update `apps/propel-docs/src/pages/index.astro` to list all components**

```astro
---
import BaseLayout from "~/layouts/BaseLayout.astro";
import { COMPONENTS } from "~/lib/components-registry";
---

<BaseLayout title="Propel" description="Documentation for @makeplane/propel's React components.">
  <main class="mx-auto flex max-w-3xl flex-col gap-10 px-6 py-16">
    <div>
      <h1 class="text-3xl font-semibold text-primary">Propel</h1>
      <p class="mt-3 text-lg text-secondary">
        Plane's React component library, built on Base UI and Tailwind CSS v4.
      </p>
    </div>
    <div class="flex gap-3">
      <a href="/installation" class="rounded-md bg-accent-primary px-4 py-2 text-sm font-medium text-on-color">
        Get started
      </a>
      <a
        href={`/components/${COMPONENTS[0].slug}`}
        class="rounded-md border border-subtle px-4 py-2 text-sm font-medium text-primary"
      >
        Browse components
      </a>
    </div>
    <ul class="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {
        COMPONENTS.map((entry) => (
          <li>
            <a
              href={`/components/${entry.slug}`}
              class="block rounded-lg border border-subtle p-4 hover:bg-surface-1"
            >
              <p class="font-medium text-primary">{entry.title}</p>
              <p class="mt-1 text-sm text-secondary">{entry.description}</p>
            </a>
          </li>
        ))
      }
    </ul>
  </main>
</BaseLayout>
```

- [ ] **Step 5: Create `apps/propel-docs/src/pages/installation.mdx`**

````mdx
---
layout: ~/layouts/ComponentLayout.astro
title: Installation
description: Install @makeplane/propel and wire up its styles.
---

## Install

```bash
pnpm add @makeplane/propel
```
````

### Peer dependencies

```bash
pnpm add react react-dom tailwindcss
```

## Import styles

`@makeplane/propel` ships a Tailwind v4 source file, not pre-built CSS — import it from your own
Tailwind entry so its tokens and utilities compile alongside your app's:

```css
@import "tailwindcss";
@import "@makeplane/propel/styles";
```

## Import components

There's no root barrel — each component is imported from its own subpath, so you only pull in
(and tree-shake to) what you use:

```tsx
import { Button } from "@makeplane/propel/components/button";
```

````

- [ ] **Step 6: Verify navigation and the installation page**

Run: `pnpm --filter @makeplane/propel-docs dev`

In a browser:
- Visit `/` — confirm the 6-component grid renders (Button, Input Field, Select, Dialog, Table, Accordion) and "Get started" / "Browse components" links are present.
- Click "Get started" — confirm it navigates to `/installation` and renders the install/peer-deps/styles/import sections with syntax-highlighted code blocks.
- Confirm the sidebar lists all 6 components (links will 404 for now — pages don't exist until Tasks 4-9 — that's expected at this point).

Stop the dev server once confirmed.

- [ ] **Step 7: Commit**

```bash
git add apps/propel-docs
git commit -m "Add layouts, sidebar nav, and installation page to propel-docs"
````

---

### Task 4: Props-table/demo plumbing + the Button page

**Files:**

- Create: `apps/propel-docs/src/lib/props-schema.ts`
- Create: `apps/propel-docs/src/components/CodeBlock.astro`
- Create: `apps/propel-docs/src/components/ComponentExample.astro`
- Create: `apps/propel-docs/src/components/PropsTable.astro`
- Create: `apps/propel-docs/src/demos/button/basic.tsx`
- Create: `apps/propel-docs/src/demos/button/with-icon.tsx`
- Create: `apps/propel-docs/src/pages/components/button.mdx`

**Interfaces:**

- Consumes: `ComponentLayout` from Task 3.
- Produces: `getComponentDoc(relativeSourcePath: string, componentName: string): import("react-docgen-typescript").ComponentDoc | undefined` from `~/lib/props-schema`, and the `CodeBlock`/`ComponentExample`/`PropsTable` Astro components, all reused unchanged by every later component-page task (5-9).

- [ ] **Step 1: Create `apps/propel-docs/src/lib/props-schema.ts`**

```ts
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { withCustomConfig, type ComponentDoc } from "react-docgen-typescript";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const propelRoot = resolve(__dirname, "../../../../packages/propel");
const propelTsconfig = resolve(propelRoot, "tsconfig.json");

// Mirrors packages/propel/.storybook/main.ts's `reactDocgenTypescriptOptions` exactly — that
// exact config is already proven to resolve propel's `StrictVariantProps`-derived union types
// (e.g. the tone/magnitude axes) into real literal unions in Storybook's own Docs prop table.
const parser = withCustomConfig(propelTsconfig, {
  shouldExtractLiteralValuesFromEnum: true,
  shouldRemoveUndefinedFromOptional: true,
  propFilter: (prop) =>
    prop.name === "children" || !prop.parent || !prop.parent.fileName.includes("node_modules"),
});

/**
 * @param relativeSourcePath - path relative to packages/propel/src, e.g. "components/button/button.tsx"
 * @param componentName - the exported function/component name to find, e.g. "Button"
 */
export function getComponentDoc(
  relativeSourcePath: string,
  componentName: string,
): ComponentDoc | undefined {
  const filePath = resolve(propelRoot, "src", relativeSourcePath);
  const docs = parser.parse(filePath);
  return docs.find((doc) => doc.displayName === componentName);
}
```

- [ ] **Step 2: Create `apps/propel-docs/src/components/CodeBlock.astro`**

```astro
---
import { Code } from "astro:components";

type Props = {
  code: string;
  lang?: string;
};

const { code, lang = "tsx" } = Astro.props;
---

<Code code={code.trimEnd()} lang={lang} theme="github-dark" />
```

- [ ] **Step 3: Create `apps/propel-docs/src/components/ComponentExample.astro`**

```astro
---
import CodeBlock from "~/components/CodeBlock.astro";

type Props = {
  code: string;
};

const { code } = Astro.props;
---

<div class="overflow-hidden rounded-lg border border-subtle">
  <div class="flex items-center justify-center border-b border-subtle bg-surface-1 p-8">
    <slot />
  </div>
  <details class="group">
    <summary class="cursor-pointer list-none px-4 py-2 text-sm text-secondary select-none">
      <span class="group-open:hidden">Show code</span>
      <span class="hidden group-open:inline">Hide code</span>
    </summary>
    <CodeBlock code={code} />
  </details>
</div>
```

- [ ] **Step 4: Create `apps/propel-docs/src/components/PropsTable.astro`**

```astro
---
import { getComponentDoc } from "~/lib/props-schema";

type Part = {
  source: string;
  component: string;
};

type Props = {
  parts: Part[];
};

const { parts } = Astro.props;
---

<div class="flex flex-col gap-8">
  {
    parts.map(({ source, component }) => {
      const doc = getComponentDoc(source, component);
      const props = doc ? Object.values(doc.props) : [];
      return (
        <div>
          <h3 class="mb-3 font-mono text-sm font-medium text-primary">{component}</h3>
          <div class="overflow-x-auto rounded-lg border border-subtle">
            <table class="w-full border-collapse text-sm">
              <thead>
                <tr class="border-b border-subtle bg-surface-1 text-left">
                  <th class="px-4 py-2 font-medium text-secondary">Prop</th>
                  <th class="px-4 py-2 font-medium text-secondary">Type</th>
                  <th class="px-4 py-2 font-medium text-secondary">Required</th>
                  <th class="px-4 py-2 font-medium text-secondary">Description</th>
                </tr>
              </thead>
              <tbody>
                {props.map((prop) => (
                  <tr class="border-b border-subtle last:border-0">
                    <td class="px-4 py-2 font-mono text-primary">{prop.name}</td>
                    <td class="max-w-xs px-4 py-2 font-mono text-xs text-secondary">
                      {prop.type.name}
                    </td>
                    <td class="px-4 py-2 text-secondary">{prop.required ? "Yes" : "No"}</td>
                    <td class="px-4 py-2 text-secondary">{prop.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    })
  }
</div>
```

- [ ] **Step 5: Create `apps/propel-docs/src/demos/button/basic.tsx`**

```tsx
import { Button } from "@makeplane/propel/components/button";

export default function BasicDemo() {
  return <Button label="Button" prominence="primary" tone="neutral" magnitude="md" sizing="hug" />;
}
```

- [ ] **Step 6: Create `apps/propel-docs/src/demos/button/with-icon.tsx`**

```tsx
import { Plus } from "lucide-react";

import { Button } from "@makeplane/propel/components/button";

export default function WithIconDemo() {
  return (
    <Button
      label="New"
      prominence="primary"
      tone="neutral"
      magnitude="md"
      sizing="hug"
      startIcon={<Plus />}
    />
  );
}
```

- [ ] **Step 7: Create `apps/propel-docs/src/pages/components/button.mdx`**

````mdx
---
layout: ~/layouts/ComponentLayout.astro
title: Button
description: Triggers an action or event, such as submitting a form or opening a dialog.
---

import ComponentExample from "~/components/ComponentExample.astro";
import PropsTable from "~/components/PropsTable.astro";
import BasicDemo from "~/demos/button/basic.tsx";
import basicSource from "~/demos/button/basic.tsx?raw";
import WithIconDemo from "~/demos/button/with-icon.tsx";
import withIconSource from "~/demos/button/with-icon.tsx?raw";

## Basic

<ComponentExample code={basicSource}>
  <BasicDemo client:visible />
</ComponentExample>

## With an icon

<ComponentExample code={withIconSource}>
  <WithIconDemo client:visible />
</ComponentExample>

## Installation

```tsx
import { Button } from "@makeplane/propel/components/button";
```
````

## Props

<PropsTable parts={[{ source: "components/button/button.tsx", component: "Button" }]} />

````

- [ ] **Step 8: Verify the Button page end-to-end**

Run: `pnpm --filter @makeplane/propel-docs dev`

In a browser, visit `/components/button` and confirm:
- Both demos render live, styled buttons (not unstyled HTML).
- Clicking "Show code" on each reveals syntax-highlighted source matching the demo file exactly.
- The Props table lists `prominence`, `tone`, `magnitude`, `sizing`, `label`, `startIcon`, `endIcon`, `loading`, `nativeButton` with real types (not `NonNullable<...>` or `unknown[number]` placeholders) — if any prop's type resolves to a placeholder, compare `props-schema.ts`'s parser config against `packages/propel/.storybook/main.ts` for a mismatched option before proceeding.
- The sidebar's "Button" link is highlighted as active.

Run: `pnpm --filter @makeplane/propel-docs typecheck`
Expected: `astro check` passes with 0 errors. If a demo file has a type error, fix the prop values based on the reported error and re-run.

With the dev server still running and `/components/button` open, confirm the dev-mode source
alias actually gives instant HMR: open `packages/propel/src/components/button/button.tsx` and
temporarily change the basic demo's rendered label by editing the JSX in `demos/button/basic.tsx`
(e.g. change `label="Button"` to `label="Button!!"`) — the browser should update within about a
second with no full page reload or dev-server restart. Revert the change. This proves the
`astro.config.mjs` alias from Task 1 is resolving to propel's live source, not a stale copy.

Stop the dev server once confirmed.

- [ ] **Step 9: Commit**

```bash
git add apps/propel-docs
git commit -m "Add props-table/demo plumbing and the Button doc page"
````

---

### Task 5: Input Field page

**Files:**

- Create: `apps/propel-docs/src/demos/input-field/basic.tsx`
- Create: `apps/propel-docs/src/pages/components/input-field.mdx`

**Interfaces:**

- Consumes: `ComponentLayout`, `ComponentExample`, `PropsTable` (Tasks 3-4) — unchanged.

- [ ] **Step 1: Create `apps/propel-docs/src/demos/input-field/basic.tsx`**

```tsx
import { InputField } from "@makeplane/propel/components/input-field";

export default function BasicDemo() {
  return (
    <InputField
      magnitude="md"
      orientation="vertical"
      label="Email"
      placeholder="you@example.com"
      description="We'll use this to send you receipts."
      hint="We'll never share your email."
    />
  );
}
```

- [ ] **Step 2: Create `apps/propel-docs/src/pages/components/input-field.mdx`**

````mdx
---
layout: ~/layouts/ComponentLayout.astro
title: Input Field
description: A labeled single-line text field with optional hint and error messaging.
---

import ComponentExample from "~/components/ComponentExample.astro";
import PropsTable from "~/components/PropsTable.astro";
import BasicDemo from "~/demos/input-field/basic.tsx";
import basicSource from "~/demos/input-field/basic.tsx?raw";

## Basic

<ComponentExample code={basicSource}>
  <BasicDemo client:visible />
</ComponentExample>

## Installation

```tsx
import { InputField } from "@makeplane/propel/components/input-field";
```
````

## Props

<PropsTable
parts={[{ source: "components/input-field/input-field.tsx", component: "InputField" }]}
/>

````

- [ ] **Step 3: Verify**

Run: `pnpm --filter @makeplane/propel-docs dev`

Visit `/components/input-field` and confirm the field renders with its label, placeholder,
description, and hint text styled correctly; "Show code" matches the demo file; the props table
lists `magnitude` (required) and `orientation` (required) alongside the optional props.

Run: `pnpm --filter @makeplane/propel-docs typecheck` — expect 0 errors.

- [ ] **Step 4: Commit**

```bash
git add apps/propel-docs
git commit -m "Add Input Field doc page"
````

---

### Task 6: Select page

**Files:**

- Create: `apps/propel-docs/src/demos/select/basic.tsx`
- Create: `apps/propel-docs/src/pages/components/select.mdx`

**Interfaces:**

- Consumes: `ComponentLayout`, `ComponentExample`, `PropsTable` (Tasks 3-4) — unchanged.

- [ ] **Step 1: Create `apps/propel-docs/src/demos/select/basic.tsx`**

```tsx
import {
  Select,
  SelectContent,
  SelectField,
  SelectItem,
  SelectLabel,
  SelectList,
  SelectTrigger,
} from "@makeplane/propel/components/select";

const SERVER_TYPES = [
  { label: "General purpose", value: "general" },
  { label: "Compute optimized", value: "compute" },
  { label: "Memory optimized", value: "memory" },
];

export default function BasicDemo() {
  return (
    <Select items={SERVER_TYPES} defaultValue="general">
      <SelectField>
        <SelectLabel>Server type</SelectLabel>
        <SelectTrigger magnitude="md" />
      </SelectField>
      <SelectContent>
        <SelectList>
          {SERVER_TYPES.map(({ label, value }) => (
            <SelectItem key={value} value={value} magnitude="md" label={label} />
          ))}
        </SelectList>
      </SelectContent>
    </Select>
  );
}
```

- [ ] **Step 2: Create `apps/propel-docs/src/pages/components/select.mdx`**

````mdx
---
layout: ~/layouts/ComponentLayout.astro
title: Select
description: Lets a user choose one option from a list in a popup.
---

import ComponentExample from "~/components/ComponentExample.astro";
import PropsTable from "~/components/PropsTable.astro";
import BasicDemo from "~/demos/select/basic.tsx";
import basicSource from "~/demos/select/basic.tsx?raw";

## Basic

<ComponentExample code={basicSource}>
  <BasicDemo client:visible />
</ComponentExample>

## Installation

```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectList,
  SelectTrigger,
} from "@makeplane/propel/components/select";
```
````

## Props

<PropsTable
parts={[
{ source: "components/select/select.tsx", component: "Select" },
{ source: "components/select/select-trigger.tsx", component: "SelectTrigger" },
{ source: "components/select/select-item.tsx", component: "SelectItem" },
]}
/>

````

- [ ] **Step 3: Verify**

Run: `pnpm --filter @makeplane/propel-docs dev`

Visit `/components/select`, click the trigger, and confirm the popup opens showing the 3 server
types with "General purpose" pre-selected (matching `defaultValue`); selecting a different option
updates the trigger. "Show code" matches the demo file. The props table shows three sub-tables
(Select, SelectTrigger, SelectItem).

If the demo fails to render or throws a console error about an unknown prop (e.g. `items` or
`defaultValue` on `Select`), open `packages/propel/src/components/select/select.stories.tsx` to
confirm the exact Base UI `Select.Root` prop names and adjust the demo accordingly, then re-verify.

Run: `pnpm --filter @makeplane/propel-docs typecheck` — expect 0 errors; fix any reported prop
mismatch using the compiler's exact error before re-running.

- [ ] **Step 4: Commit**

```bash
git add apps/propel-docs
git commit -m "Add Select doc page"
````

---

### Task 7: Dialog page

**Files:**

- Create: `apps/propel-docs/src/demos/dialog/basic.tsx`
- Create: `apps/propel-docs/src/pages/components/dialog.mdx`

**Interfaces:**

- Consumes: `ComponentLayout`, `ComponentExample`, `PropsTable` (Tasks 3-4) — unchanged.

- [ ] **Step 1: Create `apps/propel-docs/src/demos/dialog/basic.tsx`**

```tsx
import { X } from "lucide-react";

import { Button } from "@makeplane/propel/components/button";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogHeading,
  DialogTitle,
  DialogTrigger,
} from "@makeplane/propel/components/dialog";
import { Icon } from "@makeplane/propel/components/icon";
import { IconButton } from "@makeplane/propel/components/icon-button";

export default function BasicDemo() {
  return (
    <Dialog>
      <Button
        sizing="hug"
        prominence="secondary"
        tone="neutral"
        magnitude="xl"
        render={<DialogTrigger />}
        label="Delete project"
      />
      <DialogContent magnitude="sm">
        <DialogHeader>
          <DialogHeading>
            <DialogTitle>Delete project</DialogTitle>
          </DialogHeading>
          <IconButton
            prominence="ghost"
            tone="neutral"
            magnitude="lg"
            aria-label="Close"
            render={<DialogClose />}
            icon={<Icon icon={X} />}
          />
        </DialogHeader>
        <DialogBody>
          <DialogDescription>
            This permanently removes the project and all of its work items. This action can&apos;t
            be undone.
          </DialogDescription>
        </DialogBody>
        <DialogActions>
          <Button
            sizing="hug"
            prominence="secondary"
            tone="neutral"
            magnitude="xl"
            render={<DialogClose />}
            label="Cancel"
          />
          <Button
            sizing="hug"
            prominence="primary"
            tone="danger"
            magnitude="xl"
            render={<DialogClose />}
            label="Delete"
          />
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
```

- [ ] **Step 2: Create `apps/propel-docs/src/pages/components/dialog.mdx`**

````mdx
---
layout: ~/layouts/ComponentLayout.astro
title: Dialog
description: A modal overlay for focused tasks and confirmations.
---

import ComponentExample from "~/components/ComponentExample.astro";
import PropsTable from "~/components/PropsTable.astro";
import BasicDemo from "~/demos/dialog/basic.tsx";
import basicSource from "~/demos/dialog/basic.tsx?raw";

## Basic

<ComponentExample code={basicSource}>
  <BasicDemo client:visible />
</ComponentExample>

## Installation

```tsx
import { Dialog, DialogTrigger, DialogContent } from "@makeplane/propel/components/dialog";
```
````

## Props

<PropsTable
parts={[
{ source: "components/dialog/dialog.tsx", component: "Dialog" },
{ source: "components/dialog/dialog-content.tsx", component: "DialogContent" },
]}
/>

````

- [ ] **Step 3: Verify**

Run: `pnpm --filter @makeplane/propel-docs dev`

Visit `/components/dialog`, click "Delete project", and confirm the modal opens centered with a
backdrop, showing the title, close button, description, and Cancel/Delete actions; clicking the
close icon, Cancel, or Delete all close it. "Show code" matches the demo file.

Run: `pnpm --filter @makeplane/propel-docs typecheck` — expect 0 errors.

- [ ] **Step 4: Commit**

```bash
git add apps/propel-docs
git commit -m "Add Dialog doc page"
````

---

### Task 8: Table page

**Files:**

- Create: `apps/propel-docs/src/demos/table/basic.tsx`
- Create: `apps/propel-docs/src/pages/components/table.mdx`

**Interfaces:**

- Consumes: `ComponentLayout`, `ComponentExample`, `PropsTable` (Tasks 3-4) — unchanged.

- [ ] **Step 1: Create `apps/propel-docs/src/demos/table/basic.tsx`**

```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@makeplane/propel/components/table";

const COLUMNS = ["Name", "Email", "Account type"];

const PEOPLE = [
  { name: "Astra", email: "astra.terra@example.com", role: "Admin" },
  { name: "Nova", email: "nova.star@example.com", role: "Member" },
  { name: "Lyra", email: "lyra.constellation@example.com", role: "Guest" },
];

export default function BasicDemo() {
  return (
    <Table mode="table">
      <TableHeader>
        <TableRow>
          {COLUMNS.map((c) => (
            <TableHead key={c} pinned="none" label={c} />
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {PEOPLE.map((person) => (
          <TableRow key={person.email}>
            <TableCell pinned="none" padding="cell">
              {person.name}
            </TableCell>
            <TableCell pinned="none" padding="cell">
              {person.email}
            </TableCell>
            <TableCell pinned="none" padding="cell">
              {person.role}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

- [ ] **Step 2: Create `apps/propel-docs/src/pages/components/table.mdx`**

````mdx
---
layout: ~/layouts/ComponentLayout.astro
title: Table
description: Displays rows of data in columns, with optional sortable and pinned headers.
---

import ComponentExample from "~/components/ComponentExample.astro";
import PropsTable from "~/components/PropsTable.astro";
import BasicDemo from "~/demos/table/basic.tsx";
import basicSource from "~/demos/table/basic.tsx?raw";

## Basic

<ComponentExample code={basicSource}>
  <BasicDemo client:visible />
</ComponentExample>

## Installation

```tsx
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@makeplane/propel/components/table";
```
````

## Props

<PropsTable
parts={[
{ source: "components/table/table.tsx", component: "Table" },
{ source: "components/table/table-head.tsx", component: "TableHead" },
{ source: "components/table/table-cell.tsx", component: "TableCell" },
]}
/>

````

- [ ] **Step 3: Verify**

Run: `pnpm --filter @makeplane/propel-docs dev`

Visit `/components/table` and confirm the 3-column, 3-row table renders with a bordered header row
and row dividers. "Show code" matches the demo file.

If `TableRow` reports a missing-required-prop type error (it's a bare re-exported `elements` part,
not a `components` wrapper, so it may carry its own required cva axis), check
`packages/propel/src/elements/table/variants.ts` for the exact axis name and add it to each
`<TableRow>` call in the demo, then re-verify.

Run: `pnpm --filter @makeplane/propel-docs typecheck` — expect 0 errors; fix any reported prop
mismatch and re-run before committing.

- [ ] **Step 4: Commit**

```bash
git add apps/propel-docs
git commit -m "Add Table doc page"
````

---

### Task 9: Accordion page

**Files:**

- Create: `apps/propel-docs/src/demos/accordion/basic.tsx`
- Create: `apps/propel-docs/src/pages/components/accordion.mdx`

**Interfaces:**

- Consumes: `ComponentLayout`, `ComponentExample`, `PropsTable` (Tasks 3-4) — unchanged.

- [ ] **Step 1: Create `apps/propel-docs/src/demos/accordion/basic.tsx`**

```tsx
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
} from "@makeplane/propel/components/accordion";

const ITEMS = [
  {
    value: "what",
    label: "What is Plane?",
    body: "Plane is an open-source project management tool for tracking issues, sprints, and product roadmaps.",
  },
  {
    value: "pricing",
    label: "How does pricing work?",
    body: "Plane is free to self-host. Managed plans add hosting, backups, and support.",
  },
];

export default function BasicDemo() {
  return (
    <Accordion defaultValue={["what"]}>
      {ITEMS.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionHeader>
            <AccordionTrigger label={item.label} />
          </AccordionHeader>
          <AccordionPanel>{item.body}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
```

- [ ] **Step 2: Create `apps/propel-docs/src/pages/components/accordion.mdx`**

````mdx
---
layout: ~/layouts/ComponentLayout.astro
title: Accordion
description: A vertically stacked set of panels that expand and collapse one at a time.
---

import ComponentExample from "~/components/ComponentExample.astro";
import PropsTable from "~/components/PropsTable.astro";
import BasicDemo from "~/demos/accordion/basic.tsx";
import basicSource from "~/demos/accordion/basic.tsx?raw";

## Basic

<ComponentExample code={basicSource}>
  <BasicDemo client:visible />
</ComponentExample>

## Installation

```tsx
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionPanel,
} from "@makeplane/propel/components/accordion";
```
````

## Props

<PropsTable
parts={[
{ source: "components/accordion/accordion.tsx", component: "Accordion" },
{ source: "components/accordion/accordion-trigger.tsx", component: "AccordionTrigger" },
]}
/>

````

- [ ] **Step 3: Verify**

Run: `pnpm --filter @makeplane/propel-docs dev`

Visit `/components/accordion` and confirm "What is Plane?" starts expanded (per `defaultValue`),
clicking its trigger collapses it and its chevron rotates, and clicking "How does pricing work?"
expands that panel. "Show code" matches the demo file.

Run: `pnpm --filter @makeplane/propel-docs typecheck` — expect 0 errors.

- [ ] **Step 4: Commit**

```bash
git add apps/propel-docs
git commit -m "Add Accordion doc page"
````

---

### Task 10: Full workspace verification and deployment config review

**Files:**

- No new files — this task only verifies the whole app and the workspace build/lint pipeline together.

**Interfaces:**

- Consumes: every file from Tasks 1-9.

- [ ] **Step 1: Build `@makeplane/propel` so its `dist/` exists for the production resolution path**

Run: `vp build` from the repo root (builds every workspace package, including `@makeplane/propel`).
Expected: `packages/propel/dist/` is created, containing `components/*/index.js` + `.d.ts` and
`styles/propel.css`, matching `packages/propel/package.json`'s `exports` map.

If `vp build` does not produce `packages/propel/dist`, run `pnpm --filter @makeplane/propel exec vp pack`
directly (propel's own `dev` script is `vp pack --watch`, so a one-shot `vp pack` is its production
build) and confirm `dist/` appears.

- [ ] **Step 2: Production build of the docs app**

Run: `pnpm --filter @makeplane/propel-docs build`
Expected: `astro build` completes with no errors (this run is NOT in dev mode, so it resolves
`@makeplane/propel` through the real `dist` built in Step 1, not the source alias — this is the
first time the production resolution path is actually exercised). Confirm `apps/propel-docs/dist/`
contains static HTML for `/`, `/installation`, and all 6 `/components/*` pages.

- [ ] **Step 3: Preview the production build**

Run: `pnpm --filter @makeplane/propel-docs preview`
Expected: a local preview server starts. Spot-check `/`, `/installation`, and `/components/button`
in a browser — confirm they render identically to the dev-mode versions (styling, live demo,
props table). Stop the preview server once confirmed.

- [ ] **Step 4: Full repo lint/format/typecheck pass**

Run: `vp check --fix` from the repo root.
Expected: completes with 0 remaining errors across the whole workspace, including
`apps/propel-docs`. If oxfmt reorders Tailwind classes or imports in any file this plan created,
that's expected and fine — re-stage the changes.

Run: `pnpm --filter @makeplane/propel-docs typecheck`
Expected: `astro check` reports 0 errors.

- [ ] **Step 5: Review the deployment placeholders**

Open `apps/propel-docs/astro.config.mjs` and `apps/propel-docs/wrangler.jsonc`. Confirm the two
`TODO` comments (the `site` URL and the `account_id`/`routes` entries) are still clearly marked as
placeholders to fill in once a real domain/Cloudflare account is assigned — do not invent values
for these. Leave them as-is; this step is a review, not an edit.

- [ ] **Step 6: Commit**

If Step 4's `vp check --fix` changed any files:

```bash
git add apps/propel-docs
git commit -m "Fix formatting/lint issues across propel-docs"
```

If nothing changed, skip the commit — this task is verification-only.

---

## What's next (explicitly out of scope for this plan)

Per the design spec's "Open follow-ups": the remaining ~59 `components/*` pages (following the
exact pattern in Tasks 4-9), site search, a changelog page, a blocks section, an agent-queryable
CLI, `elements` layer docs, and promoting `props-schema.ts` into a real exported registry from
`@makeplane/propel`.
