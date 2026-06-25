import { cva, cx, type VariantProps } from "class-variance-authority";

import { type StrictVariantProps } from "../../internal/variant-props";

// The inline text-link look (Figma "Link"): an underlined `<a>` in the link palette, no button
// chrome. `prominence` picks the blue primary link (`primary`) or the muted gray inline link
// (`secondary`); `magnitude` sets the text size. For a link that looks like a button use `AnchorButton`.
export const anchorVariants = cva(
  cx(
    "cursor-pointer rounded-xs underline underline-offset-2 transition-colors outline-none",
    "focus-visible:ring-2 focus-visible:ring-accent-strong focus-visible:ring-offset-1",
    "aria-disabled:cursor-not-allowed aria-disabled:text-disabled aria-disabled:no-underline",
  ),
  {
    variants: {
      prominence: {
        primary: "text-link-primary hover:text-link-primary-hover",
        secondary: "text-secondary hover:text-primary",
      },
      magnitude: { sm: "text-12 leading-snug", md: "text-13", lg: "text-13", xl: "text-14" },
    },
  },
);

type AnchorVariantConfig = VariantProps<typeof anchorVariants>;
export type AnchorProminence = NonNullable<AnchorVariantConfig["prominence"]>;
export type AnchorMagnitude = NonNullable<AnchorVariantConfig["magnitude"]>;

// No `defaultVariants` today, so every axis is required.
export type AnchorVariantProps = StrictVariantProps<typeof anchorVariants>;
