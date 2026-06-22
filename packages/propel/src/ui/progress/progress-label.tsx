import { Progress as BaseProgress } from "@base-ui/react/progress";

import { progressLabelVariants } from "./variants";

/** Props for {@link ProgressLabel}; 1:1 with Base UI `Progress.Label`. */
export type ProgressLabelProps = Omit<BaseProgress.Label.Props, "className" | "style">;

/** 1:1 wrapper around Base UI `Progress.Label`. */
export function ProgressLabel(props: ProgressLabelProps) {
  return <BaseProgress.Label className={progressLabelVariants()} {...props} />;
}
