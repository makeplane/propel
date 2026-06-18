import { defineConfig } from "vite-plus";
import { configDefaults } from "vite-plus/test/config";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  // Agent worktrees (`.claude/worktrees/<name>`) are full second checkouts of the repo
  // nested inside vite's workspace root. Vitest doesn't honor `.gitignore`, so a
  // repo-root `vp test` would otherwise crawl those duplicate trees; also keep the
  // dev/test server's file watcher out of them.
  server: { watch: { ignored: ["**/.claude/**"] } },
  test: {
    exclude: [...configDefaults.exclude, "**/.claude/**"],
  },
  fmt: {
    ignorePatterns: ["dist/**"],
    // Sort Tailwind classes (oxfmt's prettier-plugin-tailwindcss equivalent). propel
    // wraps classes in `cva()` / `cx()`, so list them; `stylesheet` points at propel's
    // Tailwind v4 entry (tailwindcss + the `@theme`/`@utility` tokens) so custom
    // utilities sort in the right order.
    // https://oxc.rs/docs/guide/usage/formatter/config-file-reference.html#sorttailwindcss
    sortTailwindcss: {
      functions: ["cva", "cx"],
      stylesheet: "packages/propel/tailwind.css",
    },
    // Group + sort import statements (side-effect imports like CSS stay put, since
    // `sortSideEffects` defaults to false).
    sortImports: true,
    // Canonical key order for every package.json (script order left as-authored).
    sortPackageJson: true,
    // Normalize JSDoc/TSDoc blocks (tag aliases, capitalization, wrapping).
    jsdoc: true,
  },
  lint: {
    jsPlugins: ["./tools/oxlint-plugin-propel/src/index.ts"],
    // Tooling/config files are validated by actually building and testing, not by
    // the library's type-aware lint:
    // - .storybook/* — Storybook compiles & type-checks these itself; they use
    //   Vite idioms (CSS side-effect imports) the lib lint shouldn't police.
    // - *.config.ts — the Storybook Vitest plugin's deep Vite types overflow the
    //   type-checker's comparison-depth limit; the configs run correctly.
    ignorePatterns: [
      "**/.storybook/**",
      "**/storybook-static/**",
      "**/vite.config.ts",
      "**/vitest.config.ts",
    ],
    options: { typeAware: true, typeCheck: true },
    // Project convention: always use `type`, never `interface`.
    rules: {
      "propel/prefer-tailwind-v4-shorthand": "error",
      "typescript/consistent-type-definitions": ["error", "type"],
    },
  },
  run: {
    cache: true,
  },
});
