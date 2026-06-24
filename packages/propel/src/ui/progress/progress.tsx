import { Progress as BaseProgress } from "@base-ui/react/progress";

import { type ProgressVariantProps, progressVariants } from "./variants";

export type { ProgressVariantProps } from "./variants";

/** Props for {@link Progress} (the Base UI `Progress.Root`). */
export type ProgressProps = Omit<BaseProgress.Root.Props, "className" | "style"> &
  ProgressVariantProps;

/**
 * The atomic `Progress.Root` — maps 1:1 to Base UI's `Progress.Root`. It owns the `progressbar`
 * value model (`value` / `min` / `max` / `format` are native, not styling) and groups the progress
 * parts (`ProgressTrack` → `ProgressIndicator`, `ProgressLabel`, `ProgressValue`).
 *
 * Pass `layout="linear"` to apply the horizontal bar layout (`flex w-full items-center gap-2`) used
 * by the ready-made linear bar.
 *
 * For the ready-made bar (linear + circular variants, `magnitude`, the trailing `%` label), use the
 * `Progress` from `@plane/propel/components/progress`.
 */
export function Progress({ layout, ...props }: ProgressProps) {
  return <BaseProgress.Root className={progressVariants({ layout })} {...props} />;
}
