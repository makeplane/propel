import { Progress as BaseProgress } from "@base-ui/react/progress";
import type * as React from "react";

import { progressIndicatorVariants } from "./variants";

/** Props for {@link ProgressIndicator}; 1:1 with Base UI `Progress.Indicator`. */
export type ProgressIndicatorProps = Omit<
  React.ComponentProps<typeof BaseProgress.Indicator>,
  "className" | "style"
>;

/** 1:1 wrapper around Base UI `Progress.Indicator`. */
export function ProgressIndicator(props: ProgressIndicatorProps) {
  return <BaseProgress.Indicator className={progressIndicatorVariants()} {...props} />;
}
