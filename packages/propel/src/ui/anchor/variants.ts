import { cva, cx, type VariantProps } from "class-variance-authority";

import { type StrictVariantProps } from "../../internal/variant-props";

// The inline text-link look (Figma "Link"): an underlined `<a>` in the link palette, no button
// chrome. `emphasis` picks the blue primary link (`solid`) or the muted gray inline link
// (`subtle`); `magnitude` sets the text size. For a link that looks like a button use `ButtonAnchor`.
export const anchorVariants = cva(
  cx(
    "cursor-pointer rounded-xs underline underline-offset-2 transition-colors outline-none",
    "focus-visible:ring-2 focus-visible:ring-accent-strong focus-visible:ring-offset-1",
    "aria-disabled:cursor-not-allowed aria-disabled:text-disabled aria-disabled:no-underline",
  ),
  {
    variants: {
      emphasis: {
        solid: "text-link-primary hover:text-link-primary-hover",
        subtle: "text-secondary hover:text-primary",
      },
      magnitude: { sm: "text-12 leading-snug", md: "text-13", lg: "text-13", xl: "text-14" },
    },
  },
);

type AnchorVariantConfig = VariantProps<typeof anchorVariants>;
export type AnchorEmphasis = NonNullable<AnchorVariantConfig["emphasis"]>;
export type AnchorMagnitude = NonNullable<AnchorVariantConfig["magnitude"]>;

// No `defaultVariants` today, so every axis is required.
export type AnchorVariantProps = StrictVariantProps<typeof anchorVariants>;
