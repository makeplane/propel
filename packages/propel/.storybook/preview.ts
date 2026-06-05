import { withThemeByDataAttribute } from "@storybook/addon-themes";
import type { Preview } from "@storybook/react-vite";
import "./preview.css";

const preview: Preview = {
  // Toolbar theme switcher → sets `data-theme` on <html>, which drives propel's
  // multi-theme tokens (light / dark / *-contrast via `@variant` in variables.css).
  decorators: [
    withThemeByDataAttribute({
      attributeName: "data-theme",
      defaultTheme: "light",
      themes: {
        light: "light",
        dark: "dark",
        "light-contrast": "light-contrast",
        "dark-contrast": "dark-contrast",
      },
    }),
  ],
  parameters: {
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
  },
};

export default preview;
