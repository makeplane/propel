import { Meter as BaseMeter } from "@base-ui/react/meter";

import { meterIndicatorVariants, type MeterIndicatorVariantProps } from "./variants";

export type MeterIndicatorTone = "low" | "medium" | "high";

export type MeterIndicatorProps = Omit<BaseMeter.Indicator.Props, "className" | "style"> &
  MeterIndicatorVariantProps;

/**
 * The filled portion of the track, sized to the value. Base UI sets its `width` inline from the
 * meter value; we own only the fill color (via `tone`) and the width transition. Maps 1:1 to
 * `Meter.Indicator`.
 */
export function MeterIndicator({ tone, ...props }: MeterIndicatorProps) {
  return <BaseMeter.Indicator className={meterIndicatorVariants({ tone })} {...props} />;
}
