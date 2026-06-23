import type * as React from "react";

import { collapsibleTriggerIndicatorVariants } from "./variants";

export type CollapsibleTriggerIndicatorProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
>;

/**
 * The disclosure caret slot at the trigger's inline-end. Renders whatever svg you pass (sized to
 * the trigger's `--node-size`) and flips it 180° when the panel opens. Decorative — the trigger
 * carries the a11y state — so it is `aria-hidden`.
 */
export function CollapsibleTriggerIndicator(props: CollapsibleTriggerIndicatorProps) {
  return <span aria-hidden className={collapsibleTriggerIndicatorVariants()} {...props} />;
}
