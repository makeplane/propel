import { Progress as BaseProgress } from "@base-ui/react/progress";

import {
  Progress as ProgressElement,
  ProgressCircle,
  ProgressCircleIndicator,
  ProgressCircleSvg,
  ProgressCircleTrack,
  ProgressIndicator,
  ProgressTrack,
  ProgressValue,
  type ProgressIndicatorProps,
  type ProgressTrackProps,
} from "../../ui/progress";

// The Figma "Progress" component has two variants:
//  - linear (node 1990-51): a pill-shaped track (`layer-3-selected`) with a toned indicator
//    and an optional trailing percentage label (12px medium). `magnitude` only changes the
//    track thickness — `sm` 5px, `md` 8px.
//  - circular (node 5736-3457): a small determinate ring — a subtle track circle
//    (`layer-3-selected`) plus a toned arc proportional to the value, with rounded caps and
//    no label. `magnitude` changes the diameter — `sm` 16px, `md` 20px.
// Both are built on Base UI `Progress`, which owns the `progressbar` role +
// `aria-valuenow` for us.
export type ProgressMagnitude = NonNullable<ProgressTrackProps["magnitude"]>;
export type ProgressTone = NonNullable<ProgressIndicatorProps["tone"]>;
export type ProgressVariant = "linear" | "circular";

// Circle geometry per magnitude (value model, not styling). The Figma circular variant
// (nodes 5736-3457 / 5736-3460) is a 16px (sm) / 20px (md) box holding a 2px-stroke ring:
// a 14px circle (sm) or 18px circle (md). The centerline radius is therefore
// (diameter - stroke) / 2 -> 6 (sm) / 8 (md). The viewBox matches the box so 1 SVG user
// unit == 1px.
const RING_GEOMETRY: Record<ProgressMagnitude, { box: number; radius: number }> = {
  sm: { box: 16, radius: 6 },
  md: { box: 20, radius: 8 },
};
const RING_STROKE = 2;

export type ProgressProps = Omit<BaseProgress.Root.Props, "className" | "style" | "value"> & {
  /** `linear` = a horizontal bar. `circular` = a determinate ring. */
  variant: ProgressVariant;
  /**
   * Completion from 0 to `max` (default max 100). Pass `null` for indeterminate mode — the bar
   * animates a sliding fill and `aria-valuenow` is unset. Only applies to `variant="linear"`;
   * `circular` always requires a number.
   */
  value: number | null;
  /** `linear`: track thickness (`sm` 5px / `md` 8px). `circular`: diameter (`sm` 16px / `md` 20px). */
  magnitude: ProgressMagnitude;
  /**
   * Fill color for the indicator (and arc). Maps to semantic signal: `brand` is the default accent,
   * `success`/`warning`/`danger` encode task outcome.
   */
  tone: ProgressTone;
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
 * `tone` controls the fill color: `brand` is the accent blue, `success`/`warning`/`danger` encode
 * outcome semantics (green/amber/red).
 *
 * Composed from the `ui/progress` primitives (`Progress` root, `ProgressTrack`,
 * `ProgressIndicator`, `ProgressValue` for the bar; `ProgressCircle` › `ProgressCircleSvg` ›
 * `ProgressCircleTrack` + `ProgressCircleIndicator` for the ring), which are built on Base UI
 * `Progress` (it owns the `progressbar` role + `aria-valuenow`).
 */
export function Progress({
  variant,
  value,
  magnitude,
  tone,
  showValue = true,
  ...props
}: ProgressProps) {
  if (variant === "circular") {
    const { box, radius } = RING_GEOMETRY[magnitude];
    const circumference = 2 * Math.PI * radius;
    const max = props.max ?? 100;
    // Clamp once and feed the same value to the SVG arc and the Root, so the arc and
    // `aria-valuenow` never disagree for out-of-range input. Indeterminate mode is a
    // linear-only feature; fall back to 0 for null so the ring renders empty.
    const clampedValue = Math.min(Math.max(value ?? 0, 0), max);
    const fraction = max > 0 ? clampedValue / max : 0;
    const dashOffset = circumference * (1 - fraction);
    const center = box / 2;
    return (
      <ProgressCircle value={clampedValue} magnitude={magnitude} {...props}>
        <ProgressCircleSvg viewBox={`0 0 ${box} ${box}`}>
          <ProgressCircleTrack cx={center} cy={center} r={radius} strokeWidth={RING_STROKE} />
          <ProgressCircleIndicator
            tone={tone}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={RING_STROKE}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
          />
        </ProgressCircleSvg>
      </ProgressCircle>
    );
  }

  return (
    <ProgressElement layout="linear" value={value} {...props}>
      <ProgressTrack magnitude={magnitude}>
        {/* Base UI sets the indicator's `width` (and `inset-inline-start: 0`) from the
            value; the ui primitive owns its fill, pill radius, and the fill transition. */}
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
