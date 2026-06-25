import { Progress as BaseProgress } from "@base-ui/react/progress";

import { linearProgressLabelVariants } from "./variants";

/** Props for {@link LinearProgressLabel}; 1:1 with Base UI `LinearProgress.Label`. */
export type LinearProgressLabelProps = Omit<BaseProgress.Label.Props, "className" | "style">;

/** 1:1 wrapper around Base UI `LinearProgress.Label`. */
export function LinearProgressLabel(props: LinearProgressLabelProps) {
  return <BaseProgress.Label className={linearProgressLabelVariants()} {...props} />;
}
