import { cva } from "class-variance-authority";

import { type StrictVariantProps } from "../../internal/variant-props";

/**
 * Circular ring root variants. `magnitude` sets the diameter of the ring box. The arc and track
 * circles fill the box; geometry (radius, dash) is passed to those parts as SVG attributes.
 */
export const circularProgressVariants = cva("shrink-0", {
  variants: {
    magnitude: { sm: "size-4", md: "size-5" },
  },
});

/** The circular ring's SVG viewport. Fills its `CircularProgress` box. */
export const circularProgressSvgVariants = cva("block size-full");

/**
 * The full subtle ring behind the arc. Strokes with the same `layer-3-selected` surface token the
 * linear track fills with, so both read as the same low-emphasis track and re-tint together.
 */
export const circularProgressTrackVariants = cva("[stroke:var(--bg-layer-3-selected)]");

/**
 * The toned arc proportional to the value, with rounded caps. `tone` drives the stroke color. The
 * arc starts at 12 o'clock (`-rotate-90`, `origin-center` so the sweep stays clockwise in RTL). The
 * dash offset (the value model) is passed as an SVG attribute.
 */
export const circularProgressIndicatorVariants = cva(
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

export type CircularProgressVariantProps = StrictVariantProps<typeof circularProgressVariants>;
export type CircularProgressIndicatorVariantProps = StrictVariantProps<
  typeof circularProgressIndicatorVariants
>;
