import { Meter as BaseMeter } from "@base-ui/react/meter";

import { meterValueVariants } from "./variants";

export type MeterValueProps = Omit<BaseMeter.Value.Props, "className" | "style">;

/** A text element displaying the formatted current value. Maps 1:1 to `Meter.Value`. */
export function MeterValue(props: MeterValueProps) {
  return <BaseMeter.Value className={meterValueVariants()} {...props} />;
}
