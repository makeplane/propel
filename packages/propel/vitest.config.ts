import path from "node:path";
import { fileURLToPath } from "node:url";

import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import { configDefaults, defineConfig } from "vitest/config";

const dirname =
  typeof __dirname !== "undefined" ? __dirname : path.dirname(fileURLToPath(import.meta.url));
const agentIgnorePatterns = ["**/.claude/**", "**/.agents/**"];

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  // Keep vite's dev/test server out of local agent state (agent worktrees under
  // .claude/.agents each carry a duplicate copy of every story).
  server: { watch: { ignored: agentIgnorePatterns } },
  // Pre-bundle every story's deps in a single optimizer pass at server start. Without this the
  // browser discovers deps lazily, so a late story importing a not-yet-bundled dep triggers a
  // mid-run re-optimize; that commits a new bundle, reloads the page, and 404s the module
  // requests in flight at that moment ("Failed to fetch dynamically imported module"). Listing
  // the stories as optimizer entries + holding the server until the crawl finishes makes the
  // bundle complete before any test loads.
  optimizeDeps: {
    entries: ["src/**/*.stories.tsx"],
    holdUntilCrawlEnd: true,
  },
  test: {
    // Vitest ignores `.gitignore`, so its file discovery would otherwise crawl those
    // worktree checkouts (each carries a duplicate copy of every story). The storybook
    // project below extends this config, so the exclude applies to it too.
    exclude: [...configDefaults.exclude, ...agentIgnorePatterns],
    // The standard Storybook Vitest-addon project: one chromium browser instance running
    // every story as a test (render → play → a11y gate). See the addon docs:
    // https://storybook.js.org/docs/writing-tests/integrations/vitest-addon
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin runs tests for the stories defined in the Storybook config.
          storybookTest({
            configDir: path.join(dirname, ".storybook"),
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: "chromium" }],
          },
        },
      },
    ],
  },
});
