import { type VariantProps } from "class-variance-authority";
import type * as React from "react";

import { progressCircleIndicatorVariants } from "./variants";

/** Props for {@link ProgressCircleIndicator}. */
export type ProgressCircleIndicatorProps = Omit<
  React.ComponentPropsWithoutRef<"circle">,
  "className" | "style"
> &
  Required<Pick<VariantProps<typeof progressCircleIndicatorVariants>, "tone">>;

/**
 * The toned arc proportional to the value (the circular analogue of `ProgressIndicator`). `tone`
 * drives the stroke color. Pass the geometry (`cx` / `cy` / `r` / `strokeWidth` / `strokeDasharray`
 * / `strokeDashoffset` / `strokeLinecap`) as SVG attributes.
 */
export function ProgressCircleIndicator({ tone, ...props }: ProgressCircleIndicatorProps) {
  return <circle className={progressCircleIndicatorVariants({ tone })} {...props} />;
}
