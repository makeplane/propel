import { Meter as BaseMeter } from "@base-ui/react/meter";
import type * as React from "react";

import { meterIndicatorVariants } from "./variants";

export type MeterIndicatorProps = Omit<
  React.ComponentProps<typeof BaseMeter.Indicator>,
  "className" | "style"
>;

/**
 * The filled portion of the track, sized to the value. Base UI sets its `width` inline from the
 * meter value; we own only the fill and the width transition. Maps 1:1 to `Meter.Indicator`.
 */
export function MeterIndicator(props: MeterIndicatorProps) {
  return <BaseMeter.Indicator className={meterIndicatorVariants()} {...props} />;
}
