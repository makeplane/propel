import { Progress as BaseProgress } from "@base-ui/react/progress";

import {
  type LinearProgressIndicatorVariantProps,
  linearProgressIndicatorVariants,
} from "./variants";

export type { LinearProgressIndicatorVariantProps } from "./variants";

/** Props for {@link LinearProgressIndicator}; 1:1 with Base UI `LinearProgress.Indicator`. */
export type LinearProgressIndicatorProps = Omit<
  BaseProgress.Indicator.Props,
  "className" | "style"
> &
  LinearProgressIndicatorVariantProps;

/** 1:1 wrapper around Base UI `LinearProgress.Indicator`. The `tone` drives the fill color. */
export function LinearProgressIndicator({ tone, ...props }: LinearProgressIndicatorProps) {
  return (
    <BaseProgress.Indicator className={linearProgressIndicatorVariants({ tone })} {...props} />
  );
}
