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
// (e.g. the tone/magnitude axes) into real literal unions in Storybook's own Docs prop table.
const parser = withCustomConfig(propelTsconfig, {
  shouldExtractLiteralValuesFromEnum: true,
  shouldRemoveUndefinedFromOptional: true,
  propFilter: (prop) =>
    prop.name === "children" || !prop.parent || !prop.parent.fileName.includes("node_modules"),
});

// `parser.parse` rebuilds TypeScript program state and is expensive; several pages
// (and multiple parts on one page) resolve components from the same source file, so
// cache the parse result per file. Output is identical — only repeated work is skipped.
const docsByFile = new Map<string, ComponentDoc[]>();

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
  let docs = docsByFile.get(filePath);
  if (!docs) {
    docs = parser.parse(filePath);
    docsByFile.set(filePath, docs);
  }
  return docs.find((doc) => doc.displayName === componentName);
}
