import { cva } from "class-variance-authority";

// Banner = the Figma "Banners" component. Two scopes (`variant`) and five intents
// (`tone`). `page` is a full-width strip with a bottom border that sits at the top
// of a page; `inline` is a self-contained rounded card placed within content.
export const bannerVariants = cva("flex items-center overflow-clip", {
  variants: {
    // Figma "Scope": page banner (full-width strip) vs inline banner (rounded card).
    variant: {
      page: "gap-2 border-b px-4 py-3",
      inline: "gap-2 rounded-lg border px-3 py-2",
    },
    // Figma "Intent": the meaning/color of the banner. Each tone sets its own soft
    // background, border, and (via the text element / icon) foreground color.
    tone: {
      neutral: "",
      info: "",
      accent: "",
      warning: "",
      danger: "",
    },
  },
  // Per Figma the neutral page banner sits on the page surface, while the colored
  // tones use their soft tone surface; inline neutral uses the layered surface.
  compoundVariants: [
    { variant: "page", tone: "neutral", class: "border-subtle bg-surface-1" },
    { variant: "inline", tone: "neutral", class: "border-subtle bg-surface-2" },
    { tone: "info", class: "border-info-subtle bg-info-subtle" },
    { tone: "accent", class: "border-accent-subtle bg-accent-subtle" },
    { tone: "warning", class: "border-warning-subtle bg-warning-subtle" },
    { tone: "danger", class: "border-danger-subtle bg-danger-subtle" },
  ],
});
