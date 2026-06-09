import { DirectionProvider } from "@base-ui/react/direction-provider";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import type { Decorator, Preview } from "@storybook/react-vite";
import { useLayoutEffect } from "react";
import "./preview.css";

// Toolbar Direction switcher → drives both the DOM `dir` attribute (which powers
// CSS logical properties + Tailwind `rtl:` utilities, and reaches portaled popups)
// AND Base UI's DirectionProvider (which the Positioner reads to flip popup
// alignment). Default LTR is a no-op so existing stories are visually unchanged.
const withDirection: Decorator = (Story, context) => {
  const direction = (context.globals.direction ?? "ltr") as "ltr" | "rtl";

  useLayoutEffect(() => {
    const previous = document.documentElement.dir;
    document.documentElement.dir = direction;
    return () => {
      document.documentElement.dir = previous;
    };
  }, [direction]);

  return (
    <DirectionProvider direction={direction}>
      <Story />
    </DirectionProvider>
  );
};

const preview: Preview = {
  // Auto-generate a Docs page for every component (Storybook's recommended global
  // opt-in). The Docs page aggregates all of a component's stories + the props
  // table into one scrollable view — the surface a designer reviews during an audit.
  tags: ["autodocs"],
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
    withDirection,
  ],
  globalTypes: {
    // Toolbar Direction dropdown (LTR / RTL) for reviewing layout mirroring.
    direction: {
      description: "Writing direction (LTR / RTL)",
      defaultValue: "ltr",
      toolbar: {
        title: "Direction",
        icon: "transfer",
        items: [
          { value: "ltr", title: "LTR", right: "Left to right" },
          { value: "rtl", title: "RTL", right: "Right to left" },
        ],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    // Center components in the canvas so they're framed cleanly for review
    // instead of pinned to the top-left corner.
    layout: "centered",
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
    // Keep the sidebar tidy for audits: docs page first per component, then
    // stories alphabetically, with components themselves sorted alphabetically.
    options: {
      storySort: { method: "alphabetical", order: ["Components", "*"] },
    },

    // Align the toolbar grid overlay with propel's spacing scale: Tailwind's base
    // unit (`--spacing`) is 4px, so use 4px cells with a bold line every 4 cells
    // (16px, i.e. `gap-4`/`p-4`). Default Storybook is 20px, which doesn't line up.
    backgrounds: {
      grid: { cellSize: 4, cellAmount: 4, opacity: 0.4 },
    },

    a11y: {
      // Fail the test run (CI) on accessibility violations — every component must
      // be aria-compliant. 'todo' = report only, 'off' = skip.
      test: "error",
    },
  },
};

export default preview;
