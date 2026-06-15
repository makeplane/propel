import { DirectionProvider } from "@base-ui/react/direction-provider";
import type { Decorator, Preview } from "@storybook/react-vite";
import { useLayoutEffect } from "react";
import "./preview.css";
import { type Theme, THEMES } from "./themes";

// Per-test-project theme, injected by `vite.config.ts` via `define` so the a11y gate
// can run every story in every theme. Undefined in `storybook dev`/manual (the toolbar
// global drives it there). `typeof` guard so referencing the undeclared global is safe.
declare const __PROPEL_TEST_THEME__: Theme | undefined;
const TEST_THEME: Theme =
  typeof __PROPEL_TEST_THEME__ !== "undefined" ? __PROPEL_TEST_THEME__ : "light";

// Apply the active theme by setting `data-theme` on <html>. We do this with a custom
// decorator rather than `@storybook/addon-themes`' `withThemeByDataAttribute` because
// that addon's decorator does NOT run under `@storybook/addon-vitest` (the headless
// test render leaves `data-theme` unset), which silently left the a11y gate blind to
// every non-light theme. This decorator runs in both environments: it uses the toolbar
// `theme` global when set (manual), else the per-project `TEST_THEME` (CI), else light.
// NOTE: `||` (not `??`) because addon-vitest passes an EMPTY STRING for an unset global,
// not `undefined`. The themed `bg-canvas` on <body> (preview.css) then gives axe the
// real backdrop to compute contrast against.
const withTheme: Decorator = (Story, context) => {
  // Validate the toolbar global against the known theme list before trusting it: a
  // URL `?globals=theme:...` (or a future global) could hand us an arbitrary string.
  // Fall back to the per-project `TEST_THEME` (light in manual) when it isn't valid.
  const candidate = context.globals.theme;
  const theme: Theme = THEMES.includes(candidate as Theme) ? (candidate as Theme) : TEST_THEME;
  useLayoutEffect(() => {
    const el = document.documentElement;
    const previous = el.dataset.theme;
    el.dataset.theme = theme;
    return () => {
      if (previous == null) delete el.dataset.theme;
      else el.dataset.theme = previous;
    };
  }, [theme]);
  return <Story />;
};

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
  decorators: [withTheme, withDirection],
  globalTypes: {
    // Toolbar Theme dropdown (light / dark / *-contrast) for manual review. In tests
    // the theme comes from the per-project `TEST_THEME` instead (no toolbar there).
    theme: {
      description: "Theme",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: THEMES.map((value) => ({ value, title: value })),
        dynamicTitle: true,
      },
    },
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
      // Light is the enforced gate (fail CI on violations). Dark / *-contrast also run
      // axe in their own test projects, but report-only for now ('todo'): grey + indigo
      // label tokens are fixed (#99), but two AA gaps remain that the token values can't
      // close alone -- the dark/dark-contrast accent BACKGROUND (brand-default) is too
      // light for any on-color text, and yellow text on yellow-50 misses AA. Flip this to
      // a plain "error" once those land. ('off' = skip.)
      test: TEST_THEME === "light" ? "error" : "todo",
    },
  },
};

export default preview;
