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

// Shared source of truth for the theme list (also used by `.storybook/preview.tsx`)
// so the per-theme test projects below can't drift from the toolbar/a11y themes.
import { THEMES } from "./.storybook/themes";
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
  // Crawl every story up front so the dep optimizer pre-bundles all of their imports in a
  // single pass at server start. Otherwise the browser discovers story deps lazily, vite
  // re-optimizes mid-run, and the new bundle hash 404s in-flight module requests across the
  // parallel browser instances ("Failed to fetch dynamically imported module"). Listing the
  // stories as optimizer entries makes the cold-start optimize complete before any test loads.
  optimizeDeps: {
    entries: ["src/**/*.stories.tsx"],
    // Hold the server until the full story crawl finishes so the optimizer pre-bundles
    // everything in ONE pass. Otherwise vite commits a first pass, the crawl then adds the
    // stories' deps, and the re-bundle flips every module's hash -- 404ing in-flight
    // requests from the parallel browser instances on a cold cache.
    holdUntilCrawlEnd: true,
  },
  test: {
    // Vitest ignores `.gitignore`, so its file discovery would otherwise crawl those
    // worktree checkouts (each carries a duplicate copy of every story). The storybook
    // project below extends this config, so the exclude applies to it too.
    exclude: [...configDefaults.exclude, "**/.claude/**"],
    // Cap how many story files run at once. Each runs in all four theme instances (see
    // `browser.instances` below), so the default scheduler on a 16-core machine launches
    // dozens of chromium contexts simultaneously; under that pressure pages drop their
    // WebSocket ("Browser connection was closed") and in-flight module requests race the
    // first dep-optimize pass ("Failed to fetch dynamically imported module"). Both are
    // infra flakes, not product failures. A moderate cap keeps real parallelism (this is
    // not `--no-file-parallelism`) while staying within what one browser pool serves
    // reliably; each file is fast, so the wall-clock cost is small.
    maxWorkers: 4,
    // A SINGLE Storybook test project. The addon-vitest plugin identifies its project by
    // the `.storybook` configDir (it overrides the name to `storybook:<configDir>` when
    // launched from the Storybook UI), so there can only be one project per configDir --
    // multiple projects sharing one `.storybook` collide on that name and break the
    // in-Storybook test runner.
    //
    // The a11y gate still runs every story in every theme by fanning out over Vitest
    // browser `instances` (the supported multi-config axis): one chromium instance per
    // theme, each injecting its theme through `env` (`STORYBOOK_TEST_THEME`). The custom
    // `withTheme` decorator in `.storybook/preview.tsx` reads that env at runtime and sets
    // `data-theme` on <html>. (addon-themes' own decorator does not run under addon-vitest,
    // which previously left the gate blind to every non-light theme.)
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin runs tests for the stories defined in the Storybook config.
          // https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, ".storybook"),
          }),
        ],
        test: {
          name: "storybook",
          // Retry transient browser-context failures. Even with the concurrency cap
          // above, a chromium page can occasionally drop its connection or a module
          // import can time out under load -- infrastructure flakes, not product
          // failures -- so a couple of retries keep CI deterministic.
          retry: 2,
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            // One browser instance per theme; each sets `data-theme` from its `env`.
            // A unique `name` is required because Vitest otherwise derives the same
            // `storybook (chromium)` for every same-browser instance.
            instances: THEMES.map((theme) => ({
              browser: "chromium",
              name: theme,
              env: { STORYBOOK_TEST_THEME: theme },
            })),
          },
        },
      },
    ],
  },
});
