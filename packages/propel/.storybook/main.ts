import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";

const config: StorybookConfig = {
  framework: "@storybook/react-vite",
  // Stories live next to the components/hooks they document. (No `*.mdx` glob:
  // propel has no standalone MDX docs pages — docs are autodocs-generated from the
  // CSF stories below — and an empty glob makes addon-vitest warn "No story files
  // found for the specified pattern". Add it back here if a hand-written .mdx page
  // is ever introduced.)
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  features: {
    // RCM (Volar + TS Language Server) — faster, higher-quality component metadata.
    // Today it only powers addon-mcp (AI docs); Storybook plans to extend it to the
    // Docs prop table, at which point `react-docgen-typescript` below can be dropped.
    experimentalReactComponentMeta: true,
  },
  addons: [
    "@storybook/addon-docs", // autodocs from stories + TSDoc'd props
    "@storybook/addon-mcp", // exposes the component manifest to AI agents
    "@storybook/addon-vitest", // runs stories as browser tests
    "@storybook/addon-themes", // toolbar toggle for light/dark/contrast themes
    "@storybook/addon-a11y", // accessibility checks in the a11y panel
    // Design-review aids (see each component's stories):
    "@storybook/addon-designs", // embeds the Figma frame in the story's "Design" panel
    "storybook-addon-pseudo-states", // forces :hover/:focus/:active/etc. for static States stories
    // NB: the element-outline toolbar toggle is built into Storybook 10 core
    // ("Outline tool"), so no separate @storybook/addon-outline is needed.
  ],
  // Resolve prop types with the TypeScript compiler so the autodocs table shows
  // real unions (e.g. `"2xs" | … | "3xl"`, the tone union, `ReactNode`) instead of
  // the default react-docgen's `NonNullable` / `unknown[number]` placeholders.
  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      // Only document propel's own props, not the spread DOM / Base UI attributes — plus
      // `children`, the composition slot. react-docgen attributes `children` to React's
      // node_modules types, so the base filter would always drop it; yet react-docgen only
      // emits `children` at all when a part explicitly redeclares it in its own props type
      // (e.g. the atomic slot parts that take a bare icon / svg / label). Keeping it here
      // surfaces those opt-in, TSDoc'd `children` slots instead of an empty "couldn't be
      // auto-generated" args table, without adding a `children` row to every component.
      propFilter: (prop) =>
        prop.name === "children" || !prop.parent || !prop.parent.fileName.includes("node_modules"),
    },
  },
  // Storybook runs its own Vite build; add the Tailwind v4 plugin so propel's
  // design-token source CSS compiles inside Storybook just like in a consumer app.
  viteFinal: async (viteConfig) => {
    viteConfig.plugins ??= [];
    viteConfig.plugins.push(tailwindcss());
    return viteConfig;
  },
};

export default config;
