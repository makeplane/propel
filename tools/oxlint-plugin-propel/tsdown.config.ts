import { defineConfig } from "tsdown";

// Build the oxlint plugin (was `vp pack`). `dts.tsgo` emits declarations via the TS-Go
// type emitter (@typescript/native-preview); `exports: true` keeps the package.json
// `exports` field in sync with the emitted output. Entry defaults to `src/index.ts`.
export default defineConfig({
  dts: { tsgo: true },
  exports: true,
  // Keep the `.mjs` extension the published `exports` map points at, so
  // `exports: true` regenerates the same value (rather than rewriting to `.js`).
  fixedExtension: true,
});
