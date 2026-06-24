import { Meter as BaseMeter } from "@base-ui/react/meter";

import { meterIndicatorVariants } from "./variants";

export type MeterIndicatorTone = "low" | "medium" | "high";

export type MeterIndicatorProps = Omit<BaseMeter.Indicator.Props, "className" | "style"> & {
  /**
   * The color range the current value falls into, following the spec's breakpoints: - `"low"` →
   * suboptimal low range → warning fill - `"medium"` → optimal / default range → accent fill -
   * `"high"` → suboptimal high range → success fill
   */
  tone: MeterIndicatorTone;
};

/**
 * The filled portion of the track, sized to the value. Base UI sets its `width` inline from the
 * meter value; we own only the fill color (via `tone`) and the width transition. Maps 1:1 to
 * `Meter.Indicator`.
 */
export function MeterIndicator({ tone, ...props }: MeterIndicatorProps) {
  return <BaseMeter.Indicator className={meterIndicatorVariants({ tone })} {...props} />;
}
