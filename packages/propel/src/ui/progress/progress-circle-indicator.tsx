import type * as React from "react";

import {
  type ProgressCircleIndicatorVariantProps,
  progressCircleIndicatorVariants,
} from "./variants";

export type { ProgressCircleIndicatorVariantProps } from "./variants";

/** Props for {@link ProgressCircleIndicator}. */
export type ProgressCircleIndicatorProps = Omit<
  React.ComponentPropsWithoutRef<"circle">,
  "className" | "style"
> &
  ProgressCircleIndicatorVariantProps;

/**
 * The toned arc proportional to the value (the circular analogue of `ProgressIndicator`). `tone`
 * drives the stroke color. Pass the geometry (`cx` / `cy` / `r` / `strokeWidth` / `strokeDasharray`
 * / `strokeDashoffset` / `strokeLinecap`) as SVG attributes.
 */
export function ProgressCircleIndicator({ tone, ...props }: ProgressCircleIndicatorProps) {
  return <circle className={progressCircleIndicatorVariants({ tone })} {...props} />;
}
