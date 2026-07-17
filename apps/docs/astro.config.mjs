// @ts-check

import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

// Dev-mode alias to propel's real source, so editing a component hot-reloads
// this docs site without needing a propel watch build (`tsdown --watch`) in parallel.
// Production builds resolve `@makeplane/propel` through its normal workspace
// package + dist exports instead (no alias).
const isDev = process.argv.includes("dev");
const propelSrc = resolve(__dirname, "../../packages/propel/src");

export default defineConfig({
  // TODO: replace with the real deployed domain once one is assigned.
  site: "https://docs.example.com",
  markdown: {
    // Dual-theme Shiki for fenced MDX code blocks, matching CodeBlock.astro's
    // <Code> setup: light inline, dark via --shiki-dark vars flipped by
    // global.css when propel's dark theme is active.
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark" },
      defaultColor: "light",
    },
  },
  integrations: [mdx(), react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
    resolve: isDev
      ? {
          alias: [
            {
              find: /^@makeplane\/propel\/components\/(.*)$/,
              replacement: resolve(propelSrc, "components/$1/index.tsx"),
            },
            {
              find: "@makeplane/propel/styles",
              replacement: resolve(propelSrc, "styles/propel.css"),
            },
          ],
        }
      : undefined,
  },
});
