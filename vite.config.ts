import { defineConfig } from "vite-plus";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
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
    rules: { "typescript/consistent-type-definitions": ["error", "type"] },
  },
  run: {
    cache: true,
  },
});
