import { Progress as BaseProgress } from "@base-ui/react/progress";

import { type CircularProgressVariantProps, circularProgressVariants } from "./variants";

export type { CircularProgressVariantProps } from "./variants";

/** Props for {@link CircularProgress}. */
export type CircularProgressProps = Omit<BaseProgress.Root.Props, "className" | "style"> &
  CircularProgressVariantProps;

/**
 * The circular ring root — a styled Base UI `Progress.Root` that sizes the ring box (`magnitude`
 * `sm` 16px / `md` 20px) and owns the `progressbar` role + `aria-valuenow`. Compose a
 * `CircularProgressSvg` (holding `CircularProgressTrack` + `CircularProgressIndicator`) inside it.
 */
export function CircularProgress({ magnitude, ...props }: CircularProgressProps) {
  return <BaseProgress.Root className={circularProgressVariants({ magnitude })} {...props} />;
}
