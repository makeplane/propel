import { Progress as BaseProgress } from "@base-ui/react/progress";
import type * as React from "react";

import {
  LinearProgress as LinearProgressElement,
  LinearProgressIndicator,
  type LinearProgressIndicatorProps,
  LinearProgressLabel,
  LinearProgressTrack,
  type LinearProgressTrackProps,
  LinearProgressValue,
} from "../../elements/linear-progress";

export type LinearProgressMagnitude = NonNullable<LinearProgressTrackProps["magnitude"]>;
export type LinearProgressTone = NonNullable<LinearProgressIndicatorProps["tone"]>;

export type LinearProgressProps = Omit<BaseProgress.Root.Props, "className" | "style" | "value"> & {
  /**
   * Completion from 0 to `max` (default 100). `null` = indeterminate (animated fill,
   * `aria-valuenow` unset).
   */
  value: number | null;
  /** Track thickness: `sm` 5px / `md` 8px. */
  magnitude: LinearProgressMagnitude;
  /** Fill color: `brand` accent, `success`/`warning`/`danger` outcome. */
  tone: LinearProgressTone;
  /** Show the trailing percentage label. @default true */
  showValue?: boolean;
  /** Visible text label before the track — Base UI's `Progress.Label` (also names the bar). */
  label?: React.ReactNode;
  /** Accessible name (required — the visible % is not a substitute). */
  "aria-label": string;
};

/**
 * A horizontal determinate/indeterminate progress bar with an optional trailing `%` label. Drive it
 * with `value` (0–`max`); the fill and `aria-valuenow` follow. For a ring, use `CircularProgress`.
 * Grafts Base UI `Progress` (which owns `progressbar`) onto the `elements/linear-progress` styled
 * parts.
 */
export function LinearProgress({
  value,
  magnitude,
  tone,
  showValue = true,
  label,
  ...props
}: LinearProgressProps) {
  return (
    <BaseProgress.Root value={value} {...props} render={<LinearProgressElement />}>
      {label != null ? (
        <BaseProgress.Label render={<LinearProgressLabel />}>{label}</BaseProgress.Label>
      ) : null}
      <BaseProgress.Track render={<LinearProgressTrack magnitude={magnitude} />}>
        <BaseProgress.Indicator render={<LinearProgressIndicator tone={tone} />} />
      </BaseProgress.Track>
      {showValue ? (
        <BaseProgress.Value render={<LinearProgressValue />}>
          {(_, currentValue) => (currentValue == null ? "" : `${Math.round(currentValue)}%`)}
        </BaseProgress.Value>
      ) : null}
    </BaseProgress.Root>
  );
}
