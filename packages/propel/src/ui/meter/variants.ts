import { cva } from "class-variance-authority";

/** Root: a vertical stack holding the label/value row and the track. */
export const meterRootVariants = cva("flex w-full flex-col gap-1");

/** Label: the meter's accessible name, rendered as visible text. */
export const meterLabelVariants = cva("text-13 font-medium text-secondary");

/** Value: the formatted current value, shown alongside the label. */
export const meterValueVariants = cva("text-13 text-tertiary");

/** Track: the full range rail that contains the indicator. */
export const meterTrackVariants = cva("h-1.5 w-full overflow-hidden rounded-full bg-layer-3");

/**
 * Indicator: the filled portion. Base UI sets its `width` inline from the meter value, so we own
 * only the fill, pill radius, and the width transition — never a hardcoded width.
 *
 * The `tone` variant encodes the spec's color breakpoints: - `low` → value is in the suboptimal low
 * range → warning color - `medium` → value is in the optimal / default range → brand/accent color -
 * `high` → value is in the suboptimal high range → success color
 *
 * No `defaultVariants` — callers must supply `tone` explicitly.
 */
export const meterIndicatorVariants = cva("h-full rounded-full transition-[width] duration-200", {
  variants: {
    tone: {
      low: "bg-warning-primary",
      medium: "bg-accent-primary",
      high: "bg-success-primary",
    },
  },
});
