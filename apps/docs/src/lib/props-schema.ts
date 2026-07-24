import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";

import { withCustomConfig, type ComponentDoc } from "react-docgen-typescript";

// Locate propel's package root via its own `exports` entry (`"./package.json"`),
// not a path relative to this file: at `astro build` time Vite bundles this module
// into dist/.prerender/chunks/, so an `import.meta.url`-relative path no longer
// points at packages/propel. Module resolution through the workspace symlink is
// stable regardless of where the bundler places this code.
const require = createRequire(import.meta.url);
const propelRoot = dirname(require.resolve("@makeplane/propel/package.json"));
const propelTsconfig = resolve(propelRoot, "tsconfig.json");

// Mirrors packages/propel/.storybook/main.ts's `reactDocgenTypescriptOptions` exactly — that
// exact config is already proven to resolve propel's `StrictVariantProps`-derived union types
// (e.g. the variant/size axes) into real literal unions in Storybook's own Docs prop table.
const parser = withCustomConfig(propelTsconfig, {
  shouldExtractLiteralValuesFromEnum: true,
  shouldRemoveUndefinedFromOptional: true,
  propFilter: (prop) =>
    prop.name === "children" || !prop.parent || !prop.parent.fileName.includes("node_modules"),
});

// `parser.parse` rebuilds TypeScript program state and is expensive; several pages
// (and multiple parts on one page) resolve components from the same source file, so
// cache the parse result per file. Output is identical — only repeated work is skipped.
//
// Production builds only: during `astro dev` this module persists across requests, so a
// permanent cache would keep showing a stale props table after a propel component's
// types are edited. In dev we skip the cache and always re-parse for fresh output; in a
// build nothing changes mid-run, so caching is a pure win. `NODE_ENV` (set to
// "production" by `astro build`, "development" by `astro dev`) is used instead of
// `import.meta.env` so this `.ts` file type-checks under the workspace lint without
// Astro's client type augmentation.
const parseCache = process.env.NODE_ENV === "production" ? new Map<string, ComponentDoc[]>() : null;

/**
 * @param relativeSourcePath - Path relative to packages/propel/src, e.g.
 *   "components/button/button.tsx"
 * @param componentName - The exported function/component name to find, e.g. "Button"
 */
export function getComponentDoc(
  relativeSourcePath: string,
  componentName: string,
): ComponentDoc | undefined {
  const filePath = resolve(propelRoot, "src", relativeSourcePath);
  let docs = parseCache?.get(filePath);
  if (!docs) {
    docs = parser.parse(filePath);
    parseCache?.set(filePath, docs);
  }
  return docs.find((doc) => doc.displayName === componentName);
}
