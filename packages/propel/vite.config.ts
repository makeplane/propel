/// <reference types="vitest/config" />
import { existsSync, readdirSync } from "node:fs";
import { defineConfig } from "vite-plus";

// Build one entry per component/hook so each is published as its own subpath
// (`@plane/propel/components/<name>`, `@plane/propel/hooks/<name>`). There is no
// root barrel.
//
// We read the folders directly and feed tsdown a *named* entry object. A bare
// glob that matches a single file collapses to a root `index` output (and a `.`
// export), which is exactly what we don't want — named entries keep every file
// at its real path no matter how many there are.
import path from "node:path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
const dirname =
  typeof __dirname !== "undefined" ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
function subpathEntries(): Record<string, string> {
  const entry: Record<string, string> = {};
  for (const group of ["components", "hooks"]) {
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
// so adding `src/components/button/index.ts` exposes
// `@plane/propel/components/button` with no config or manifest edits.
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
  test: {
    // One Storybook test project per theme, so every story's play test + axe a11y gate
    // runs in all four themes. The theme is injected into the preview build via `define`
    // (`__PROPEL_TEST_THEME__`); the custom `withTheme` decorator reads it and sets
    // `data-theme` on <html>. (addon-themes' own decorator does not run under
    // addon-vitest, which previously left the gate blind to every non-light theme.)
    projects: ["light", "dark", "light-contrast", "dark-contrast"].map((theme) => ({
      extends: true,
      define: {
        __PROPEL_TEST_THEME__: JSON.stringify(theme),
      },
      plugins: [
        // The plugin runs tests for the stories defined in the Storybook config.
        // https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
        storybookTest({
          configDir: path.join(dirname, ".storybook"),
        }),
      ],
      test: {
        name: `storybook-${theme}`,
        // Retry once on failure. On a cold start, Vite's dep optimizer can re-bundle
        // a Storybook internal dep (e.g. @storybook/react-dom-shim) mid-run and
        // invalidate the cached module URL, so a story file intermittently fails to
        // import with "Failed to fetch dynamically imported module". It's a dep-
        // optimizer timing race, not a product failure (the dep is cached by the
        // retry), so a single retry clears it and keeps CI deterministic.
        retry: 1,
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [
            {
              browser: "chromium",
            },
          ],
        },
      },
    })),
  },
});
