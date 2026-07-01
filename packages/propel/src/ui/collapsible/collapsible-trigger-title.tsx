import type * as React from "react";

import { collapsibleTriggerTitleVariants } from "./variants";

export type CollapsibleTriggerTitleProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
> & {
  /** The trigger's label text. */
  children?: React.ReactNode;
};

/**
 * The trigger's label. Grows to fill the trigger row so a trailing `CollapsibleTriggerIndicator`
 * sits at the inline-end edge.
 */
export function CollapsibleTriggerTitle(props: CollapsibleTriggerTitleProps) {
  return <span className={collapsibleTriggerTitleVariants()} {...props} />;
}
