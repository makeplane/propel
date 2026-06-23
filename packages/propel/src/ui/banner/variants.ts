import { cva, cx } from "class-variance-authority";

import { nodeSlotClass } from "../../internal/node-slot";

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

// Foreground (icon) color per tone, mapped from the Figma `icon/*` tokens.
// The page banner uses a 20px icon; inline uses a 16px icon (per Figma typography).
export const bannerIconVariants = cva("shrink-0", {
  variants: {
    variant: {
      page: "size-5",
      inline: "size-4",
    },
    tone: {
      neutral: "text-icon-secondary",
      info: "text-icon-info-secondary",
      accent: "text-icon-accent-primary",
      warning: "text-icon-warning-primary",
      danger: "text-icon-danger-primary",
    },
  },
});

// The leading node slot (when a custom `inlineStartNode` is passed).
// Combines the static nodeSlotClass with variant-driven size token and tone color.
export const bannerIconNodeVariants = cva(nodeSlotClass, {
  variants: {
    variant: {
      page: "[--node-size:1.25rem]",
      inline: "[--node-size:1rem]",
    },
    tone: {
      neutral: "text-icon-secondary",
      info: "text-icon-info-secondary",
      accent: "text-icon-accent-primary",
      warning: "text-icon-warning-primary",
      danger: "text-icon-danger-primary",
    },
  },
});

// Foreground (message text) color per tone. warning/danger use the primary token
// because their secondary text step doesn't meet WCAG AA on the soft background.
// Page banners use medium-weight text; inline uses regular-weight (per Figma).
export const bannerBodyVariants = cva("min-w-0 flex-1 text-14 leading-relaxed", {
  variants: {
    variant: {
      page: "font-medium",
      inline: "font-normal",
    },
    tone: {
      neutral: "text-secondary",
      info: "text-info-primary",
      accent: "text-accent-primary",
      warning: "text-warning-primary",
      danger: "text-danger-primary",
    },
  },
});

// Trailing actions wrapper: always the same layout regardless of variant/tone.
export const bannerActionsVariants = cva("flex shrink-0 items-center gap-2");

// Dismiss button: always the same layout and chrome regardless of variant/tone.
export const bannerDismissVariants = cva(
  cx(
    "flex shrink-0 items-center justify-center rounded-md p-1 text-icon-tertiary",
    "hover:bg-layer-1",
  ),
);
