import type * as React from "react";

import { circularProgressTrackVariants } from "./variants";

/** Props for {@link CircularProgressTrack}. */
export type CircularProgressTrackProps = Omit<
  React.ComponentPropsWithoutRef<"circle">,
  "className" | "style"
> & {
  /**
   * Optional inline SVG (e.g. a `<title>`); the ring geometry is passed via the `cx` / `cy` / `r` /
   * `strokeWidth` attributes.
   */
  children?: React.ReactNode;
};

/**
 * The full subtle ring behind the arc (the circular analogue of `ProgressTrack`). Pass the geometry
 * (`cx` / `cy` / `r` / `strokeWidth`) as SVG attributes; the low-emphasis stroke color is baked
 * in.
 */
export function CircularProgressTrack(props: CircularProgressTrackProps) {
  return <circle className={circularProgressTrackVariants()} {...props} />;
}
