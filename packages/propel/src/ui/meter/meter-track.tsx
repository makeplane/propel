import { Meter as BaseMeter } from "@base-ui/react/meter";

import { meterTrackVariants } from "./variants";

export type MeterTrackProps = Omit<BaseMeter.Track.Props, "className" | "style">;

/** The full range rail that contains the indicator. Maps 1:1 to `Meter.Track`. */
export function MeterTrack(props: MeterTrackProps) {
  return <BaseMeter.Track className={meterTrackVariants()} {...props} />;
}
