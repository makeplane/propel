import type * as React from "react";

import { circleTrackVariants } from "./variants";

/** Props for {@link ProgressCircleTrack}. */
export type ProgressCircleTrackProps = Omit<
  React.ComponentPropsWithoutRef<"circle">,
  "className" | "style"
>;

/**
 * The full subtle ring behind the arc (the circular analogue of `ProgressTrack`). Pass the geometry
 * (`cx` / `cy` / `r` / `strokeWidth`) as SVG attributes; the low-emphasis stroke color is baked
 * in.
 */
export function ProgressCircleTrack(props: ProgressCircleTrackProps) {
  return <circle className={circleTrackVariants()} {...props} />;
}
