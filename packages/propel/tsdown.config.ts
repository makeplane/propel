import { existsSync, readdirSync } from "node:fs";

// Build one entry per primitive/component/hook so each is published as its own
// subpath. The three component tiers each get a group: `base` (Base UI extensions),
// `elements` (styled intrinsic elements via useRender), and `components` (ready-made
// compositions of `elements`) — e.g. `@makeplane/propel/elements/<name>`,
// `@makeplane/propel/hooks/<name>`. There is no root barrel.
//
// We read the folders directly and feed tsdown a *named* entry object. A bare
// glob that matches a single file collapses to a root `index` output (and a `.`
// export), which is exactly what we don't want — named entries keep every file
// at its real path no matter how many there are.
import { defineConfig } from "tsdown";

function subpathEntries(): Record<string, string> {
  const entry: Record<string, string> = {};
  for (const group of ["base", "elements", "components", "hooks"]) {
    const dir = `src/${group}`;
    if (!existsSync(dir)) continue;
    for (const dirent of readdirSync(dir, { withFileTypes: true })) {
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

// Library build (was `vp pack`, which is tsdown under the hood). tsdown auto-externalizes
// everything in `dependencies` + `peerDependencies`, so there is no hand-maintained external
// allowlist. The package.json `exports` map is static wildcards (see that file), so adding
// `src/elements/button/index.ts` exposes `@makeplane/propel/elements/button` with no config
// or manifest edits.
export default defineConfig({
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
  copy: [{ from: "src/styles/*.css", to: "dist/styles" }],
});
