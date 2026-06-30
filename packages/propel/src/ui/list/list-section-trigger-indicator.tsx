import type * as React from "react";

import { listSectionTriggerIndicatorVariants } from "./variants";

export type ListSectionTriggerIndicatorProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
>;

/**
 * The disclosure caret slot at a `ListSectionTrigger`'s inline-end. Renders whatever svg you pass
 * (sized to the trigger's `--node-size`) pointing toward the inline-end while collapsed, rotating
 * down when the panel opens — the same motion as the accordion trigger. Decorative — the trigger
 * carries the a11y state — so it is `aria-hidden`.
 */
export function ListSectionTriggerIndicator(props: ListSectionTriggerIndicatorProps) {
  return <span aria-hidden className={listSectionTriggerIndicatorVariants()} {...props} />;
}
