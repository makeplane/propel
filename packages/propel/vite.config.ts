/// <reference types="vitest/config" />
import { existsSync, readdirSync } from "node:fs";
// Build one entry per primitive/component/hook so each is published as its own
// subpath. The three component tiers each get a group: `base` (Base UI extensions),
// `ui` (Base UI parts styled with Plane tokens), and `components` (ready-made
// compositions of `ui`) — e.g. `@plane/propel/ui/<name>`, `@plane/propel/hooks/<name>`.
// There is no root barrel.
//
// We read the folders directly and feed tsdown a *named* entry object. A bare
// glob that matches a single file collapses to a root `index` output (and a `.`
// export), which is exactly what we don't want — named entries keep every file
// at its real path no matter how many there are.
import path from "node:path";
import { fileURLToPath } from "node:url";

import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vite-plus";
import { configDefaults } from "vite-plus/test/config";

const dirname =
  typeof __dirname !== "undefined" ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
function subpathEntries(): Record<string, string> {
  const entry: Record<string, string> = {};
  for (const group of ["base", "ui", "components", "hooks"]) {
    const dir = `src/${group}`;
    if (!existsSync(dir)) continue;
    for (const dirent of readdirSync(dir, {
      withFileTypes: true,
    })) {
      if (!dirent.isDirectory()) continue;
      // Each component/hook folder has a single `index.tsx` (or `.ts`) entry.
      const file = [`${dir}/${dirent.name}/index.tsx`, `${dir}/${dirent.name}/index.ts`].find(
        existsSync,
      );
      if (file) entry[`${group}/${dirent.name}/index`] = file;
    }
  }
  return entry;
}

// Library build via `vp pack` (tsdown). tsdown auto-externalizes everything in
// `dependencies` + `peerDependencies`, so there is no hand-maintained external
// allowlist. The package.json `exports` map is static wildcards (see that file),
// so adding `src/ui/button/index.ts` exposes
// `@plane/propel/ui/button` with no config or manifest edits.
export default defineConfig({
  pack: {
    entry: subpathEntries(),
    format: ["es"],
    platform: "neutral",
    dts: true,
    sourcemap: true,
    // Validate the published package on every build.
    publint: true,
    attw: {
      profile: "esm-only",
      level: "error",
      excludeEntrypoints: [/^\.\/styles/],
    },
    // Preserve the source module graph (one output file per source module) for
    // maximum tree-shaking.
    unbundle: true,
    clean: true,
    // Mark every emitted chunk as a client component so the library works inside
    // React Server Component boundaries (e.g. Next.js app router).
    banner: '"use client";',
    // Ship the design tokens as standalone CSS (not bundled through JS).
    copy: [
      {
        from: "src/styles/*.css",
        to: "dist/styles",
      },
    ],
  },
  // Keep vite's dev/test server out of nested agent worktrees (`.claude/worktrees/<name>`,
  // full second checkouts living inside the workspace root). See the root `vite.config.ts`.
  server: { watch: { ignored: ["**/.claude/**"] } },
  // Pre-bundle every story's deps in a single optimizer pass at server start. Without this the
  // browser discovers deps lazily, so a late story importing a not-yet-bundled dep triggers a
  // mid-run re-optimize; that commits a new bundle, reloads the page, and 404s the module
  // requests in flight at that moment ("Failed to fetch dynamically imported module"). Listing
  // the stories as optimizer entries + holding the server until the crawl finishes makes the
  // bundle complete before any test loads.
  optimizeDeps: {
    entries: ["src/**/*.stories.tsx"],
    holdUntilCrawlEnd: true,
  },
  test: {
    // Vitest ignores `.gitignore`, so its file discovery would otherwise crawl those
    // worktree checkouts (each carries a duplicate copy of every story). The storybook
    // project below extends this config, so the exclude applies to it too.
    exclude: [...configDefaults.exclude, "**/.claude/**"],
    // The standard Storybook Vitest-addon project: one chromium browser instance running
    // every story as a test (render → play → a11y gate). See the addon docs:
    // https://storybook.js.org/docs/writing-tests/integrations/vitest-addon
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin runs tests for the stories defined in the Storybook config.
          storybookTest({
            configDir: path.join(dirname, ".storybook"),
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: "chromium" }],
          },
        },
      },
    ],
  },
});
