import { cva } from "class-variance-authority";

import { type StrictVariantProps } from "../../internal/variant-props";

export const linearProgressVariants = cva("flex w-full items-center gap-2");

export const linearProgressTrackVariants = cva(
  "relative min-w-0 flex-1 overflow-hidden rounded-full bg-layer-3-selected",
  { variants: { magnitude: { sm: "h-[5px]", md: "h-2" } } },
);

/**
 * Indicator fill variants. `tone` drives the fill color of the bar; all other indicator styles
 * (pill radius, transition, inset) are always the same. Base UI's `data-indeterminate` triggers a
 * slide-pulse so the bar can communicate an unknown-duration operation without a fixed value.
 */
export const linearProgressIndicatorVariants = cva(
  [
    "absolute inset-y-0 rounded-full transition-[width] duration-300 ease-out",
    "data-indeterminate:w-1/3 data-indeterminate:animate-progress-indeterminate data-indeterminate:transition-none",
  ],
  {
    variants: {
      tone: {
        brand: "bg-accent-primary",
        success: "bg-success-primary",
        warning: "bg-warning-primary",
        danger: "bg-danger-primary",
      },
    },
  },
);

export const linearProgressLabelVariants = cva("text-13 font-medium text-secondary");

// The percentage readout is tinted to match the fill `tone` (per Figma) — the semantic color reads
// on both the bar and the number.
export const linearProgressValueVariants = cva("text-12 font-medium tabular-nums", {
  variants: {
    tone: {
      brand: "text-accent-primary",
      success: "text-success-primary",
      warning: "text-warning-primary",
      danger: "text-danger-primary",
    },
  },
});

export type LinearProgressTrackVariantProps = StrictVariantProps<
  typeof linearProgressTrackVariants
>;
export type LinearProgressIndicatorVariantProps = StrictVariantProps<
  typeof linearProgressIndicatorVariants
>;
export type LinearProgressValueVariantProps = StrictVariantProps<
  typeof linearProgressValueVariants
>;
