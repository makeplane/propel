import tailwindcss from "@tailwindcss/vite";
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  framework: "@storybook/react-vite",
  // Stories live next to the components/hooks they document.
  stories: ["../src/**/*.stories.@(ts|tsx)", "../src/**/*.mdx"],
  addons: [
    "@storybook/addon-docs", // autodocs from stories + TSDoc'd props
    "@storybook/addon-mcp", // exposes the component manifest to AI agents
    "@storybook/addon-vitest", // runs stories as browser tests
    "@storybook/addon-themes", // toolbar toggle for light/dark/contrast themes
    "@storybook/addon-a11y", // accessibility checks in the a11y panel
  ],
  // Storybook runs its own Vite build; add the Tailwind v4 plugin so propel's
  // design-token source CSS compiles inside Storybook just like in a consumer app.
  viteFinal: async (viteConfig) => {
    viteConfig.plugins ??= [];
    viteConfig.plugins.push(tailwindcss());
    return viteConfig;
  },
};

export default config;
