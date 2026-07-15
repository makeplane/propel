import { Progress as BaseProgress } from "@base-ui/react/progress";

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

type LinearProgressOwnProps = Omit<
  BaseProgress.Root.Props,
  "className" | "style" | "value" | "render" | "aria-label"
> & {
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
};

/**
 * The bar always has an accessible name: pass a visible `label` (names it via Base UI's
 * `Progress.Label`) or an `aria-label` — the union makes omitting both a type error rather than a
 * silently unnamed progressbar.
 */
export type LinearProgressProps = LinearProgressOwnProps &
  (
    | {
        /** Visible text label before the track — Base UI's `Progress.Label` (also names the bar). */
        label: string;
        /** Accessible name. Optional when `label` is set — the visible label already names the bar. */
        "aria-label"?: string;
      }
    | {
        label?: undefined;
        /** Accessible name (required when there is no visible `label`). */
        "aria-label": string;
      }
  );

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
