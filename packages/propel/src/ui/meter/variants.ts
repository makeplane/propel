import { cva } from "class-variance-authority";

import { type StrictVariantProps } from "../../internal/variant-props";

/** Root: a vertical stack holding the header row and the track. */
export const meterVariants = cva("flex w-full flex-col gap-1");

/**
 * Header: the row above the track that pairs the label and value. Per the spec the label sits at
 * the inline-start and the value text at the inline-end (`justify-between`), both vertically
 * centered — an anatomy extension beyond Base UI's parts so the components tier holds no raw
 * layout.
 */
export const meterHeaderVariants = cva("flex items-center justify-between gap-2");

/** Label: the meter's accessible name, rendered as visible text. */
export const meterLabelVariants = cva("text-13 font-medium text-secondary");

/** Value: the formatted current value, shown at the header's inline-end. */
export const meterValueVariants = cva("text-13 text-tertiary");

/** Track: the full range rail that contains the indicator. */
export const meterTrackVariants = cva("h-1.5 w-full overflow-hidden rounded-full bg-layer-3");

/**
 * Indicator: the filled portion. Base UI sets its `width` inline from the meter value, so we own
 * only the fill, pill radius, and the width transition — never a hardcoded width.
 *
 * The `level` variant encodes the spec's color breakpoints: - `low` → value is in the suboptimal
 * low range → warning color - `medium` → value is in the optimal / default range → brand/accent
 * color - `high` → value is in the suboptimal high range → success color
 *
 * No `defaultVariants` — callers must supply `level` explicitly.
 */
export const meterIndicatorVariants = cva("h-full rounded-full transition-[width] duration-200", {
  variants: {
    level: {
      low: "bg-warning-primary",
      medium: "bg-accent-primary",
      high: "bg-success-primary",
    },
  },
});

// No `defaultVariants` today, so every axis is required.
export type MeterIndicatorVariantProps = StrictVariantProps<typeof meterIndicatorVariants>;
