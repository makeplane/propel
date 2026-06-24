import type * as React from "react";

import { tableCellTriggerIndicatorVariants } from "./variants";

export type TableCellTriggerIndicatorProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
>;

/**
 * The trailing glyph slot inside a `TableCellTrigger` (the editable chevron, the action ellipsis).
 * Sizes its single child to the trigger's `--node-size` and tints it, dimming when the trigger is
 * disabled. Decorative, so it is `aria-hidden`.
 */
export function TableCellTriggerIndicator(props: TableCellTriggerIndicatorProps) {
  return <span aria-hidden className={tableCellTriggerIndicatorVariants()} {...props} />;
}
