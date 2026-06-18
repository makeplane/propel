import { Meter as BaseMeter } from "@base-ui/react/meter";
import type * as React from "react";

import { meterLabelVariants } from "./variants";

export type MeterLabelProps = Omit<
  React.ComponentProps<typeof BaseMeter.Label>,
  "className" | "style"
>;

/** The meter's accessible label. Maps 1:1 to `Meter.Label`. */
export function MeterLabel(props: MeterLabelProps) {
  return <BaseMeter.Label className={meterLabelVariants()} {...props} />;
}
