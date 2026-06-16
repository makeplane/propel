import { defineConfig } from "vite-plus";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  fmt: {
    ignorePatterns: ["dist/**"],
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
    // Tailwind class linting (v4) via oxlint-tailwindcss. The oxfmt
    // `fmt.sortTailwindcss` handles ordering, so this covers correctness
    // (conflicts / duplicates / deprecated / typos) plus logical-property
    // enforcement, since propel ships LTR + RTL. `entryPoint` is propel's
    // Tailwind v4 entry (tailwindcss + the `@theme`/`@utility` tokens).
    jsPlugins: ["oxlint-tailwindcss", "./tools/oxlint-plugin-propel/src/index.ts"],
    // Monorepo entryPoint mapping (first matching glob wins): packages/propel uses
    // its Tailwind v4 entry; the `**` fallback covers any other file so the plugin
    // never lacks an entry point.
    settings: {
      tailwindcss: {
        entryPoint: [
          { files: "packages/propel/**", use: "packages/propel/tailwind.css" },
          { files: "**", use: "packages/propel/tailwind.css" },
        ],
      },
      // oxlint-plugin-propel derives its semantic-typography map from propel's
      // `--text-*` `@theme` tokens; point it at the source CSS (cwd-relative).
      propel: {
        variablesCss: "packages/propel/src/styles/variables.css",
      },
    },
    // Project convention: always use `type`, never `interface`.
    rules: {
      "typescript/consistent-type-definitions": ["error", "type"],
      // Recommended set: https://oxlint-tailwindcss.pages.dev/setup
      // (cva + cx are already in the plugin's default callees, so class strings in
      // both — incl. cva's base arg, variant values, and `class:` keys — are scanned.)
      "tailwindcss/no-conflicting-classes": "error",
      "tailwindcss/no-deprecated-classes": "error",
      "tailwindcss/no-duplicate-classes": "warn",
      "tailwindcss/no-unknown-classes": "error",
      "tailwindcss/enforce-canonical": "warn",
      "tailwindcss/no-unnecessary-arbitrary-value": "warn",
      "tailwindcss/enforce-sort-order": "warn",
      "tailwindcss/consistent-variant-order": "warn",
      "tailwindcss/enforce-consistent-important-position": "warn",
      "tailwindcss/no-unnecessary-whitespace": "warn",
      // Enforce propel's semantic typography tokens over raw size/weight classes
      // (`text-13 font-medium` → `text-body-xs-medium`). Autofix reproduces the
      // WEB-7003 migration; see tools/oxlint-plugin-propel.
      "propel/no-raw-typography-class": "error",
    },
  },
  run: {
    cache: true,
  },
});
