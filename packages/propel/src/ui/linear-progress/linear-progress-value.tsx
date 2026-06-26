import { Progress as BaseProgress } from "@base-ui/react/progress";

import { linearProgressValueVariants } from "./variants";

/** Props for {@link LinearProgressValue}; 1:1 with Base UI `LinearProgress.Value`. */
export type LinearProgressValueProps = Omit<BaseProgress.Value.Props, "className" | "style">;

/**
 * 1:1 wrapper around Base UI `LinearProgress.Value`. Renders the percentage as a neutral readout;
 * the semantic tone lives on the fill, not the number.
 */
export function LinearProgressValue(props: LinearProgressValueProps) {
  return <BaseProgress.Value className={linearProgressValueVariants()} {...props} />;
}
