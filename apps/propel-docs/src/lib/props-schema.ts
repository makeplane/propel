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
 * @param relativeSourcePath - Path relative to packages/propel/src, e.g.
 *   "components/button/button.tsx"
 * @param componentName - The exported function/component name to find, e.g. "Button"
 */
export function getComponentDoc(
  relativeSourcePath: string,
  componentName: string,
): ComponentDoc | undefined {
  const filePath = resolve(propelRoot, "src", relativeSourcePath);
  const docs = parser.parse(filePath);
  return docs.find((doc) => doc.displayName === componentName);
}
