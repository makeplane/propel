import { Progress as BaseProgress } from "@base-ui/react/progress";

import {
  Progress as ProgressElement,
  ProgressIndicator,
  type ProgressIndicatorProps,
  ProgressTrack,
  type ProgressTrackProps,
  ProgressValue,
} from "../../ui/progress";

export type LinearProgressMagnitude = NonNullable<ProgressTrackProps["magnitude"]>;
export type LinearProgressTone = NonNullable<ProgressIndicatorProps["tone"]>;

export type LinearProgressProps = Omit<BaseProgress.Root.Props, "className" | "style" | "value"> & {
  /**
   * Completion from 0 to `max` (default 100). Pass `null` for indeterminate (animated fill,
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
 * Composes the `ui/progress` linear primitives on Base UI `Progress` (which owns `progressbar` +
 * `aria-valuenow`).
 */
export function LinearProgress({
  value,
  magnitude,
  tone,
  showValue = true,
  ...props
}: LinearProgressProps) {
  return (
    <ProgressElement layout="linear" value={value} {...props}>
      <ProgressTrack magnitude={magnitude}>
        <ProgressIndicator tone={tone} />
      </ProgressTrack>
      {showValue ? (
        <ProgressValue>
          {(_, currentValue) => (currentValue == null ? "" : `${Math.round(currentValue)}%`)}
        </ProgressValue>
      ) : null}
    </ProgressElement>
  );
}
