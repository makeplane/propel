import { Progress as BaseProgress } from "@base-ui/react/progress";

import { linearProgressVariants } from "./variants";

/** Props for {@link LinearProgress} (the Base UI `LinearProgress.Root`). */
export type LinearProgressProps = Omit<BaseProgress.Root.Props, "className" | "style">;

/**
 * The atomic `LinearProgress.Root` — maps 1:1 to Base UI's `LinearProgress.Root`. It owns the
 * `linearProgressbar` value model (`value` / `min` / `max` / `format` are native, not styling) and
 * groups the linearProgress parts (`LinearProgressTrack` → `LinearProgressIndicator`,
 * `LinearProgressLabel`, `LinearProgressValue`).
 *
 * For the ready-made bar (linear + circular variants, `magnitude`, the trailing `%` label), use the
 * `LinearProgress` from `@plane/propel/components/linearProgress`.
 */
export function LinearProgress(props: LinearProgressProps) {
  return <BaseProgress.Root className={linearProgressVariants()} {...props} />;
}
