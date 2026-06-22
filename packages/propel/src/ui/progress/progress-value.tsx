import { Progress as BaseProgress } from "@base-ui/react/progress";

import { progressValueVariants } from "./variants";

/** Props for {@link ProgressValue}; 1:1 with Base UI `Progress.Value`. */
export type ProgressValueProps = Omit<BaseProgress.Value.Props, "className" | "style">;

/** 1:1 wrapper around Base UI `Progress.Value`. */
export function ProgressValue(props: ProgressValueProps) {
  return <BaseProgress.Value className={progressValueVariants()} {...props} />;
}
