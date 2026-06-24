import { Progress as BaseProgress } from "@base-ui/react/progress";

import { type ProgressCircleVariantProps, progressCircleVariants } from "./variants";

export type { ProgressCircleVariantProps } from "./variants";

/** Props for {@link ProgressCircle}. */
export type ProgressCircleProps = Omit<BaseProgress.Root.Props, "className" | "style"> &
  ProgressCircleVariantProps;

/**
 * The circular ring root — a styled Base UI `Progress.Root` that sizes the ring box (`magnitude`
 * `sm` 16px / `md` 20px) and owns the `progressbar` role + `aria-valuenow`. Compose a
 * `ProgressCircleSvg` (holding `ProgressCircleTrack` + `ProgressCircleIndicator`) inside it.
 */
export function ProgressCircle({ magnitude, ...props }: ProgressCircleProps) {
  return <BaseProgress.Root className={progressCircleVariants({ magnitude })} {...props} />;
}
