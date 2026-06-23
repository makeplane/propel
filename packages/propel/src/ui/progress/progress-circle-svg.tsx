import type * as React from "react";

import { circleSvgVariants } from "./variants";

/** Props for {@link ProgressCircleSvg}. */
export type ProgressCircleSvgProps = Omit<
  React.ComponentPropsWithoutRef<"svg">,
  "className" | "style"
>;

/**
 * The SVG viewport of the circular ring. Fills its `ProgressCircle` box and holds the
 * `ProgressCircleTrack` + `ProgressCircleIndicator` circles. Decorative (the `ProgressCircle` root
 * carries the `progressbar` a11y), so it is `aria-hidden`. Pass a `viewBox` matching the ring box
 * so one SVG user unit equals one pixel.
 */
export function ProgressCircleSvg(props: ProgressCircleSvgProps) {
  return <svg aria-hidden="true" fill="none" className={circleSvgVariants()} {...props} />;
}
