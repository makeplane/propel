// propel's themes (driven by `data-theme` on <html> via `@variant` in variables.css).
// Single source of truth shared by `.storybook/preview.tsx` (toolbar global + a11y
// validation) and `vite.config.ts` (one test project per theme) so the list can't drift.
export const THEMES = ["light", "dark", "light-contrast", "dark-contrast"] as const;
export type Theme = (typeof THEMES)[number];
