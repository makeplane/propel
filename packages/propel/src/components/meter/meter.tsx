import { Meter as BaseMeter } from "@base-ui/react/meter";
import type * as React from "react";

import {
  Meter as MeterElement,
  MeterHeader,
  MeterIndicator,
  MeterLabel,
  MeterTrack,
  MeterValue,
  type MeterIndicatorLevel,
} from "../../elements/meter";

export type MeterProps = Omit<
  BaseMeter.Root.Props,
  "className" | "style" | "render" | "children"
> & {
  /**
   * Optional visible label rendered above the track (e.g. "Disk usage"). When omitted, provide an
   * `aria-label` so the gauge is still named for assistive tech.
   */
  label?: React.ReactNode;
  /**
   * Whether to show the formatted value text alongside the label.
   *
   * @default true
   */
  showValue?: boolean;
  /**
   * The threshold below which the value is considered "low" (suboptimal). Values below this
   * threshold display the warning fill color. Mirrors the native `<meter low>` attribute. Defaults
   * to `min`.
   */
  low?: number;
  /**
   * The threshold above which the value is considered "high" (suboptimal). Values above this
   * threshold display the success fill color. Mirrors the native `<meter high>` attribute. Defaults
   * to `max`.
   */
  high?: number;
  /**
   * The value considered optimal. Together with `low` and `high`, this determines whether the
   * optimal range is at the low end, the middle, or the high end of the range. Mirrors the native
   * `<meter optimum>` attribute. When omitted the middle range is treated as optimal (accent
   * fill).
   */
  optimum?: number;
};

/**
 * Derives the indicator level from the current value and the low/high/optimum thresholds, following
 * the same color-assignment logic as the native HTML `<meter>` element:
 *
 * - The range is divided into three segments: [min, low), [low, high], (high, max].
 * - `optimum` determines which segment is "best":
 *
 *   - If optimum is in the low segment → low=success, middle=warning, high=danger (use warning).
 *   - If optimum is in the high segment → low=warning (danger), middle=warning, high=success.
 *   - Otherwise (optimum in middle or unset) → low=warning, middle=success/accent, high=warning.
 * - Propel maps: optimal segment → "high" (success), middle → "medium" (accent), worst → "low"
 *   (warning).
 *
 * For simplicity we use a three-bucket model: below `low` → warning, above `high` → success,
 * between → accent. When `optimum` shifts what's "best", we invert the outer buckets accordingly.
 */
function deriveIndicatorLevel({
  value,
  low,
  high,
  optimum,
}: {
  value: number;
  low: number;
  high: number;
  optimum: number | undefined;
}): MeterIndicatorLevel {
  const inLow = value < low;
  const inHigh = value > high;
  const inMiddle = !inLow && !inHigh;

  // Determine where optimum sits
  const optimumInLow = optimum !== undefined && optimum < low;
  const optimumInHigh = optimum !== undefined && optimum > high;

  if (optimumInLow) {
    // Best is the low segment: low→success, middle→warning, high→warning
    if (inLow) return "high";
    return "low";
  }

  if (optimumInHigh) {
    // Best is the high segment: high→success, middle→warning, low→warning
    if (inHigh) return "high";
    return "low";
  }

  // Best is the middle (default): middle→medium (accent), outer buckets→low (warning)
  if (inMiddle) return "medium";
  return "low";
}

/**
 * The ready-made meter: a static gauge that graphs a numeric `value` within a known range
 * (`min`/`max`, default 0–100) — disk usage, quota consumption, password strength. Drive it with
 * `value`; the fill and the formatted readout follow. Pass `format` (an `Intl.NumberFormatOptions`)
 * to format the value, and either `label` (visible) or `aria-label` to name it.
 *
 * Use `low`/`high`/`optimum` to set the color breakpoints; the indicator fill reflects which
 * segment the current value falls in (warning for suboptimal, accent for normal, success for
 * optimal high — mirroring native `<meter>` semantics).
 *
 * Composed from the `elements/meter` parts (`Meter` root + `MeterLabel` + `MeterTrack` +
 * `MeterIndicator` + `MeterValue`), which are built on Base UI `Meter` (it owns the `meter` role +
 * `aria-valuenow`).
 */
export function Meter({
  label,
  showValue = true,
  low,
  high,
  optimum,
  min = 0,
  max = 100,
  ...props
}: MeterProps) {
  const resolvedLow = low ?? min;
  const resolvedHigh = high ?? max;

  const level = deriveIndicatorLevel({
    value: props.value,
    low: resolvedLow,
    high: resolvedHigh,
    optimum,
  });

  const hasLabel = label != null;
  const header = hasLabel || showValue;

  return (
    <BaseMeter.Root min={min} max={max} render={<MeterElement />} {...props}>
      {header ? (
        <MeterHeader>
          {hasLabel ? <BaseMeter.Label render={<MeterLabel />}>{label}</BaseMeter.Label> : null}
          {showValue ? <BaseMeter.Value render={<MeterValue />} /> : null}
        </MeterHeader>
      ) : null}
      <BaseMeter.Track render={<MeterTrack />}>
        <BaseMeter.Indicator render={<MeterIndicator level={level} />} />
      </BaseMeter.Track>
    </BaseMeter.Root>
  );
}
