import type * as React from "react";

import {
  type CircularProgressIndicatorVariantProps,
  circularProgressIndicatorVariants,
} from "./variants";

/** Props for {@link CircularProgressIndicator}. */
export type CircularProgressIndicatorProps = Omit<
  React.ComponentPropsWithoutRef<"circle">,
  "className" | "style"
> &
  CircularProgressIndicatorVariantProps;

/**
 * The toned arc proportional to the value (the circular analogue of `ProgressIndicator`). `tone`
 * drives the stroke color. Pass the geometry (`cx` / `cy` / `r` / `strokeWidth` / `strokeDasharray`
 * / `strokeDashoffset` / `strokeLinecap`) as SVG attributes.
 */
export function CircularProgressIndicator({ tone, ...props }: CircularProgressIndicatorProps) {
  return <circle className={circularProgressIndicatorVariants({ tone })} {...props} />;
}
