import { Meter as BaseMeter } from "@base-ui/react/meter";

import { meterIndicatorVariants, type MeterIndicatorVariantProps } from "./variants";

export type MeterIndicatorLevel = "low" | "medium" | "high";

export type MeterIndicatorProps = Omit<BaseMeter.Indicator.Props, "className" | "style"> &
  MeterIndicatorVariantProps;

/**
 * The filled portion of the track, sized to the value. Base UI sets its `width` inline from the
 * meter value; we own only the fill color (via `level`) and the width transition. Maps 1:1 to
 * `Meter.Indicator`.
 */
export function MeterIndicator({ level, ...props }: MeterIndicatorProps) {
  return <BaseMeter.Indicator className={meterIndicatorVariants({ level })} {...props} />;
}
