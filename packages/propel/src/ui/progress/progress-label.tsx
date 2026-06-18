import { Progress as BaseProgress } from "@base-ui/react/progress";
import type * as React from "react";

import { progressLabelVariants } from "./variants";

/** Props for {@link ProgressLabel}; 1:1 with Base UI `Progress.Label`. */
export type ProgressLabelProps = Omit<
  React.ComponentProps<typeof BaseProgress.Label>,
  "className" | "style"
>;

/** 1:1 wrapper around Base UI `Progress.Label`. */
export function ProgressLabel(props: ProgressLabelProps) {
  return <BaseProgress.Label className={progressLabelVariants()} {...props} />;
}
