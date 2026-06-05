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
  },
  run: {
    cache: true,
  },
});
