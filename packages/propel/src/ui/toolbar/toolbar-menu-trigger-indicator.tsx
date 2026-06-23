import type * as React from "react";

import { toolbarMenuTriggerIndicatorVariants } from "./variants";

export type ToolbarMenuTriggerIndicatorProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
>;

/**
 * The disclosure caret slot at the inline-end of a toolbar menu trigger. Renders whatever svg you
 * pass (sized to the trigger's `--node-size`) and tints it. Decorative (the trigger button carries
 * the a11y state), so it is `aria-hidden`.
 */
export function ToolbarMenuTriggerIndicator(props: ToolbarMenuTriggerIndicatorProps) {
  return <span aria-hidden className={toolbarMenuTriggerIndicatorVariants()} {...props} />;
}
