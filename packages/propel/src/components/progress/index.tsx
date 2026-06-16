import { Progress as BaseProgress } from "@base-ui/react/progress";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const trackVariants = cva(
  "relative min-w-0 flex-1 overflow-hidden rounded-full bg-layer-3-selected",
  {
    variants: {
      magnitude: {
        sm: "h-1.25",
        md: "h-2",
      },
    },
  },
);

// The Figma "Progress" component (node 1990-51) is a linear bar: a pill-shaped track
// (`layer-3-selected`) with an accent-filled indicator and an optional trailing
// percentage label (`text/accent/primary`, 12px medium). The only thing the
// `magnitude` axis changes is the track thickness — `sm` 5px, `md` 8px. Built on Base
// UI `Progress`, which owns the `progressbar` role + `aria-valuenow` and sizes the
// indicator from `value` for us.
export type ProgressMagnitude = NonNullable<VariantProps<typeof trackVariants>["magnitude"]>;

export type ProgressProps = Omit<
  React.ComponentProps<typeof BaseProgress.Root>,
  "className" | "render" | "style" | "value"
> & {
  /** Completion from 0 to `max` (default max 100). */
  value: number;
  /** Track thickness. `sm` 5px / `md` 8px. */
  magnitude: ProgressMagnitude;
  /** Show the trailing percentage label. @default true */
  showValue?: boolean;
  /**
   * Accessible name for the bar. Required: a progress bar needs a name for assistive
   * tech (the visible percentage is not a substitute).
   */
  "aria-label": string;
};

/**
 * A linear progress bar — task completion over time (uploads, imports, the Toast
 * auto-dismiss countdown). Drive it with `value` (0–`max`, default max 100); the
 * filled indicator and `aria-valuenow` follow. The trailing `%` label shows by
 * default; hide it with `showValue={false}`.
 */
export function Progress({ value, magnitude, showValue = true, ...props }: ProgressProps) {
  return (
    <BaseProgress.Root value={value} className="flex w-full items-center gap-2" {...props}>
      <BaseProgress.Track className={trackVariants({ magnitude })}>
        {/* Base UI sets the indicator's `width` (and `inset-inline-start: 0`) from the
            value; we own its fill, pill radius, and the fill transition. */}
        <BaseProgress.Indicator className="absolute inset-y-0 rounded-full bg-accent-primary transition-[width] duration-300 ease-out" />
      </BaseProgress.Track>
      {showValue ? (
        <BaseProgress.Value className="shrink-0 text-caption-md-medium text-accent-primary tabular-nums">
          {(_, currentValue) => (currentValue == null ? "" : `${Math.round(currentValue)}%`)}
        </BaseProgress.Value>
      ) : null}
    </BaseProgress.Root>
  );
}
