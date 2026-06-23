import { cva } from "class-variance-authority";

/**
 * Indicator fill variants. `tone` drives the fill color of the bar (and the arc in the circular
 * ring). All other indicator styles — pill radius, transition, inset — are always the same.
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
 * Value text variants. `tone` keeps the percentage in the same hue family as the fill, so the
 * number reads as part of the same semantic signal.
 */
export const progressValueVariants = cva("text-12 font-medium tabular-nums", {
  variants: {
    tone: {
      brand: "text-accent-primary",
      success: "text-success-primary",
      warning: "text-warning-primary",
      danger: "text-danger-primary",
    },
  },
});

export const rootVariants = cva("", {
  variants: {
    layout: {
      linear: "flex w-full items-center gap-2",
    },
  },
});

export const trackVariants = cva(
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
 * Circular ring container variants. `tone` sets the `--progress-fill` CSS custom property which the
 * indicator arc circle reads via `[stroke:var(--progress-fill)]`, keeping all className composition
 * inside cva.
 */
export const ringVariants = cva("shrink-0", {
  variants: {
    magnitude: {
      sm: "size-4",
      md: "size-5",
    },
    tone: {
      brand: "[--progress-fill:var(--bg-accent-primary)]",
      success: "[--progress-fill:var(--bg-success-primary)]",
      warning: "[--progress-fill:var(--bg-warning-primary)]",
      danger: "[--progress-fill:var(--bg-danger-primary)]",
    },
  },
});
