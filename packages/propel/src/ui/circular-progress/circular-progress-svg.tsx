import type * as React from "react";

import { circularProgressSvgVariants } from "./variants";

/** Props for {@link CircularProgressSvg}. */
export type CircularProgressSvgProps = Omit<
  React.ComponentPropsWithoutRef<"svg">,
  "className" | "style"
>;

/**
 * The SVG viewport of the circular ring. Fills its `CircularProgress` box and holds the
 * `CircularProgressTrack` + `CircularProgressIndicator` circles. Decorative (the `CircularProgress`
 * root carries the `progressbar` a11y), so it is `aria-hidden`. Pass a `viewBox` matching the ring
 * box so one SVG user unit equals one pixel.
 */
export function CircularProgressSvg(props: CircularProgressSvgProps) {
  return (
    <svg aria-hidden="true" fill="none" className={circularProgressSvgVariants()} {...props} />
  );
}
