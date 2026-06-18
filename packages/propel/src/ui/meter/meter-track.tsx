import { Meter as BaseMeter } from "@base-ui/react/meter";
import type * as React from "react";

import { meterTrackVariants } from "./variants";

export type MeterTrackProps = Omit<
  React.ComponentProps<typeof BaseMeter.Track>,
  "className" | "style"
>;

/** The full range rail that contains the indicator. Maps 1:1 to `Meter.Track`. */
export function MeterTrack(props: MeterTrackProps) {
  return <BaseMeter.Track className={meterTrackVariants()} {...props} />;
}
