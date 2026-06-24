import { cva, cx, type VariantProps } from "class-variance-authority";

import { nodeSlotClass } from "../../internal/node-slot";
import { type StrictVariantProps } from "../../internal/variant-props";

// Banner = the Figma "Banners" component. Two scopes (`placement`) and five intents
// (`tone`). `page` is a full-width strip with a bottom border that sits at the top
// of a page; `inline` is a self-contained rounded card placed within content.
//
// Each part below renders exactly one element and owns its chrome through cva, so the
// components tier composes the parts without any `className` of its own.
export const bannerVariants = cva("flex items-center overflow-clip", {
  variants: {
    // Figma "Scope": page banner (full-width strip) vs inline banner (rounded card).
    placement: {
      page: "gap-2 border-b px-4 py-3",
      inline: "gap-2 rounded-lg border px-3 py-2",
    },
    // Figma "Intent": the meaning/color of the banner. Each tone sets its own soft
    // background and border; the foreground color lives on the text/icon parts.
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
    { placement: "page", tone: "neutral", class: "border-subtle bg-surface-1" },
    { placement: "inline", tone: "neutral", class: "border-subtle bg-surface-2" },
    { tone: "info", class: "border-info-subtle bg-info-subtle" },
    { tone: "accent", class: "border-accent-subtle bg-accent-subtle" },
    { tone: "warning", class: "border-warning-subtle bg-warning-subtle" },
    { tone: "danger", class: "border-danger-subtle bg-danger-subtle" },
  ],
});

// The leading icon slot at the banner's inline-start. Sizes its single child to the
// placement's node size (page 20px, inline 16px per Figma typography) via the shared
// node-slot class, and tints it with the tone's `icon/*` token.
export const bannerIconVariants = cva(nodeSlotClass, {
  variants: {
    placement: {
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

// The message column. Grows to fill the row (`flex-1`/`min-w-0`) so actions and the
// dismiss control sit at the inline-end. Stacks the title above the body with a small
// gap. Carries the tone foreground color (inherited by Title and Description) and the
// per-placement weight: page banners use medium-weight text, inline regular (per Figma).
// warning/danger use the primary token because their secondary text step doesn't meet
// WCAG AA on the soft background.
export const bannerBodyVariants = cva(
  "flex min-w-0 flex-1 flex-col gap-1 text-14 leading-relaxed",
  {
    variants: {
      placement: {
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
  },
);

// The banner's headline block, stacked above the description inside the body column.
export const bannerTitleVariants = cva("");

// The banner's supporting message block, below the title inside the body column.
export const bannerDescriptionVariants = cva("");

// Trailing actions wrapper: always the same layout regardless of placement/tone.
export const bannerActionsVariants = cva("flex shrink-0 items-center gap-2");

// Dismiss button: always the same layout and chrome regardless of placement/tone. Sizes
// its single glyph child to a 16px node so callers pass a bare icon.
export const bannerDismissVariants = cva(
  cx(
    nodeSlotClass,
    "rounded-md p-1 text-icon-tertiary [--node-size:1rem]",
    "cursor-pointer hover:bg-layer-1",
    "outline-none focus-visible:ring-2 focus-visible:ring-accent-strong",
  ),
);

export type BannerPlacement = NonNullable<VariantProps<typeof bannerVariants>["placement"]>;
export type BannerTone = NonNullable<VariantProps<typeof bannerVariants>["tone"]>;
export type BannerVariantProps = StrictVariantProps<typeof bannerVariants>;
export type BannerBodyVariantProps = StrictVariantProps<typeof bannerBodyVariants>;
export type BannerIconVariantProps = StrictVariantProps<typeof bannerIconVariants>;
