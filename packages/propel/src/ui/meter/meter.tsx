import { Meter as BaseMeter } from "@base-ui/react/meter";

import { meterRootVariants } from "./variants";

export type MeterProps = Omit<BaseMeter.Root.Props, "className" | "style">;

/**
 * A static gauge that graphs a numeric `value` within a known range (`min`/`max`, default 0–100):
 * disk usage, quota consumption, password strength. Unlike `Progress` — which tracks task
 * completion over time — a meter is a measurement, not a countdown, and its value can move in
 * either direction. Maps 1:1 to Base UI's `Meter.Root`.
 */
export function Meter(props: MeterProps) {
  return <BaseMeter.Root className={meterRootVariants()} {...props} />;
}
