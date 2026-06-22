import { Meter as BaseMeter } from "@base-ui/react/meter";

import { meterIndicatorVariants } from "./variants";

export type MeterIndicatorProps = Omit<BaseMeter.Indicator.Props, "className" | "style">;

/**
 * The filled portion of the track, sized to the value. Base UI sets its `width` inline from the
 * meter value; we own only the fill and the width transition. Maps 1:1 to `Meter.Indicator`.
 */
export function MeterIndicator(props: MeterIndicatorProps) {
  return <BaseMeter.Indicator className={meterIndicatorVariants()} {...props} />;
}
