import { Meter as BaseMeter } from "@base-ui/react/meter";

import { meterLabelVariants } from "./variants";

export type MeterLabelProps = Omit<BaseMeter.Label.Props, "className" | "style">;

/** The meter's accessible label. Maps 1:1 to `Meter.Label`. */
export function MeterLabel(props: MeterLabelProps) {
  return <BaseMeter.Label className={meterLabelVariants()} {...props} />;
}
