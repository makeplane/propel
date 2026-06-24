import { cva } from "class-variance-authority";

import { type StrictVariantProps } from "../../internal/variant-props";

/**
 * Indicator fill variants. `tone` drives the fill color of the bar. All other indicator styles —
 * pill radius, transition, inset — are always the same.
 *
 * Indeterminate state: Base UI sets `data-indeterminate` on its Root and propagates it to the
 * Indicator; we target it here with a slide-pulse animation so the bar communicates an
 * unknown-duration operation without a fixed value.
 */
export const progressIndicatorVariants = cva(
  [
    "absolute inset-y-0 rounded-full transition-[width] duration-300 ease-out",
    // Indeterminate: slide a shorter bar back and forth across the track.
    // Suppress the determinate width transition so it doesn't interfere.
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

export const progressLabelVariants = cva("text-13 font-medium text-secondary");

/**
 * Value text variants. The percentage is a neutral readout (matching `ProgressLabel`'s
 * `text-secondary`), not a toned signal: the semantic color lives on the fill bar/arc. Keeping the
 * number neutral also avoids the low-contrast amber/green readouts against a neutral surface (toned
 * text only meets WCAG AA on its own soft tone background, which the percentage does not have).
 */
export const progressValueVariants = cva("text-12 font-medium text-secondary tabular-nums");

export const progressVariants = cva("", {
  variants: {
    layout: {
      linear: "flex w-full items-center gap-2",
    },
  },
});

export const progressTrackVariants = cva(
  "relative min-w-0 flex-1 overflow-hidden rounded-full bg-layer-3-selected",
  {
    variants: {
      magnitude: {
        sm: "h-[5px]",
        md: "h-2",
      },
    },
  },
);

/**
 * Circular ring root variants. `magnitude` sets the diameter of the ring box. The arc and track
 * circles fill the box; geometry (radius, dash) is passed to those parts as SVG attributes.
 */
export const progressCircleVariants = cva("shrink-0", {
  variants: {
    magnitude: {
      sm: "size-4",
      md: "size-5",
    },
  },
});

/** The circular ring's SVG viewport. Fills its `ProgressCircle` box. */
export const progressCircleSvgVariants = cva("block size-full");

/**
 * The full subtle ring behind the arc. Strokes with the same `layer-3-selected` surface token the
 * linear track fills with, so both variants read as the same low-emphasis track and re-tint
 * together in every theme.
 */
export const progressCircleTrackVariants = cva("[stroke:var(--bg-layer-3-selected)]");

/**
 * The toned arc proportional to the value, with rounded caps. `tone` drives the stroke color. The
 * arc is rotated so it starts at 12 o'clock; `transform-origin: center` keeps the rotation about
 * the circle's center so the visual sweep stays clockwise in RTL too. The dash offset (the value
 * model) is passed as an SVG attribute.
 */
export const progressCircleIndicatorVariants = cva(
  "origin-center -rotate-90 transition-[stroke-dashoffset] duration-300 ease-out",
  {
    variants: {
      tone: {
        brand: "[stroke:var(--bg-accent-primary)]",
        success: "[stroke:var(--bg-success-primary)]",
        warning: "[stroke:var(--bg-warning-primary)]",
        danger: "[stroke:var(--bg-danger-primary)]",
      },
    },
  },
);

export type ProgressVariantProps = StrictVariantProps<typeof progressVariants>;

export type ProgressTrackVariantProps = StrictVariantProps<typeof progressTrackVariants>;

export type ProgressIndicatorVariantProps = StrictVariantProps<typeof progressIndicatorVariants>;

export type ProgressCircleVariantProps = StrictVariantProps<typeof progressCircleVariants>;

export type ProgressCircleIndicatorVariantProps = StrictVariantProps<
  typeof progressCircleIndicatorVariants
>;
