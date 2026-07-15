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

// The percentage is a neutral readout (matching the label), not a toned signal — the semantic color
// lives on the fill bar. Neutral also keeps the small 12px number AA-legible: the warning amber
// text token lands at 4.49:1 on the neutral surface (below WCAG AA), so tinting the % is not viable.
export const linearProgressValueVariants = cva("text-12 font-medium text-secondary tabular-nums");

export type LinearProgressTrackVariantProps = StrictVariantProps<
  typeof linearProgressTrackVariants
>;
export type LinearProgressIndicatorVariantProps = StrictVariantProps<
  typeof linearProgressIndicatorVariants
>;
