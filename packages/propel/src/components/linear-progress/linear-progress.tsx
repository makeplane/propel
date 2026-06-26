import { Progress as BaseProgress } from "@base-ui/react/progress";

import {
  LinearProgress as LinearProgressElement,
  LinearProgressIndicator,
  type LinearProgressIndicatorProps,
  LinearProgressTrack,
  type LinearProgressTrackProps,
  LinearProgressValue,
} from "../../ui/linear-progress";

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
  /** Accessible name (required — the visible % is not a substitute). */
  "aria-label": string;
};

/**
 * A horizontal determinate/indeterminate progress bar with an optional trailing `%` label. Drive it
 * with `value` (0–`max`); the fill and `aria-valuenow` follow. For a ring, use `CircularProgress`.
 * Composes the `ui/linear-progress` primitives on Base UI `Progress` (which owns `progressbar`).
 */
export function LinearProgress({
  value,
  magnitude,
  tone,
  showValue = true,
  ...props
}: LinearProgressProps) {
  return (
    <LinearProgressElement value={value} {...props}>
      <LinearProgressTrack magnitude={magnitude}>
        <LinearProgressIndicator tone={tone} />
      </LinearProgressTrack>
      {showValue ? (
        <LinearProgressValue>
          {(_, currentValue) => (currentValue == null ? "" : `${Math.round(currentValue)}%`)}
        </LinearProgressValue>
      ) : null}
    </LinearProgressElement>
  );
}
