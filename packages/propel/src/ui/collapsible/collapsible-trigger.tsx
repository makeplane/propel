import { Collapsible as BaseCollapsible } from "@base-ui/react/collapsible";
import type * as React from "react";

import { collapsibleTriggerVariants } from "./variants";

export type CollapsibleTriggerProps = Omit<
  React.ComponentProps<typeof BaseCollapsible.Trigger>,
  "className" | "style"
>;

/**
 * The button that opens and closes the panel. Base UI sets `aria-expanded`/`aria-controls` and
 * reflects open state as `[data-panel-open]` on this element. Maps 1:1 to `Collapsible.Trigger`.
 */
export function CollapsibleTrigger(props: CollapsibleTriggerProps) {
  return <BaseCollapsible.Trigger className={collapsibleTriggerVariants()} {...props} />;
}
