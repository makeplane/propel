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

    // Align the toolbar grid overlay with propel's spacing scale: Tailwind's base
    // unit (`--spacing`) is 4px, so use 4px cells with a bold line every 4 cells
    // (16px, i.e. `gap-4`/`p-4`). Default Storybook is 20px, which doesn't line up.
    backgrounds: {
      grid: { cellSize: 4, cellAmount: 4, opacity: 0.4 },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};

export default preview;
