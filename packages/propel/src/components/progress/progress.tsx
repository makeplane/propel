import { Progress as BaseProgress } from "@base-ui/react/progress";
import * as React from "react";

import {
  Progress as ProgressRoot,
  ProgressCircle,
  ProgressIndicator,
  ProgressTrack,
  ProgressValue,
  type ProgressTrackProps,
} from "../../ui/progress";

// The Figma "Progress" component has two variants:
//  - linear (node 1990-51): a pill-shaped track (`layer-3-selected`) with an
//    accent-filled indicator and an optional trailing percentage label
//    (`text/accent/primary`, 12px medium). `magnitude` only changes the track
//    thickness — `sm` 5px, `md` 8px.
//  - circular (node 5736-3457): a small determinate ring — a subtle track circle
//    (`layer-3-selected`, the same surface the linear track uses) plus an accent arc
//    (`background/accent/primary`) proportional to the value, with rounded caps and no
//    label. `magnitude` changes the diameter — `sm` 16px, `md` 20px.
// Both are built on Base UI `Progress`, which owns the `progressbar` role +
// `aria-valuenow` for us.
export type ProgressMagnitude = NonNullable<ProgressTrackProps["magnitude"]>;
export type ProgressVariant = "linear" | "circular";

export type ProgressProps = Omit<
  React.ComponentProps<typeof BaseProgress.Root>,
  "className" | "style" | "value"
> & {
  /** `linear` = a horizontal bar. `circular` = a determinate ring. */
  variant: ProgressVariant;
  /** Completion from 0 to `max` (default max 100). */
  value: number;
  /** `linear`: track thickness (`sm` 5px / `md` 8px). `circular`: diameter (`sm` 16px / `md` 20px). */
  magnitude: ProgressMagnitude;
  /**
   * Show the trailing percentage label. Only applies to `variant="linear"` — the circular rings are
   * too small for a label, so this is ignored when `circular`.
   *
   * @default true
   */
  showValue?: boolean;
  /**
   * Accessible name for the bar. Required: a progress bar needs a name for assistive tech (the
   * visible percentage is not a substitute).
   */
  "aria-label": string;
};

/**
 * A determinate progress indicator — task completion over time (uploads, imports, the Toast
 * auto-dismiss countdown). Drive it with `value` (0–`max`, default max 100); the fill and
 * `aria-valuenow` follow.
 *
 * `variant="linear"` is a horizontal bar with an optional trailing `%` label (shown by default;
 * hide it with `showValue={false}`). `variant="circular"` is a small ring with no label
 * (`showValue` is ignored).
 *
 * Composed from the `ui/progress` primitives (`Progress` root, `ProgressTrack`,
 * `ProgressIndicator`, `ProgressValue`, `ProgressCircle`), which are built on Base UI `Progress`
 * (it owns the `progressbar` role + `aria-valuenow`).
 */
export function Progress({ variant, value, magnitude, showValue = true, ...props }: ProgressProps) {
  if (variant === "circular") {
    return <ProgressCircle value={value} magnitude={magnitude} {...props} />;
  }

  return (
    <ProgressRoot layout="linear" value={value} {...props}>
      <ProgressTrack magnitude={magnitude}>
        {/* Base UI sets the indicator's `width` (and `inset-inline-start: 0`) from the
            value; the ui primitive owns its fill, pill radius, and the fill transition. */}
        <ProgressIndicator />
      </ProgressTrack>
      {showValue ? (
        <ProgressValue>
          {(_, currentValue) => (currentValue == null ? "" : `${Math.round(currentValue)}%`)}
        </ProgressValue>
      ) : null}
    </ProgressRoot>
  );
}
