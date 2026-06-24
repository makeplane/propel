import type * as React from "react";

import { contextMenuItemLabelVariants } from "./variants";

export type ContextMenuItemLabelProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
>;

/**
 * The label region of a menu row. Grows to fill the row so trailing regions (shortcut, indicator,
 * submenu caret) sit at the inline-end; truncates rather than overflowing.
 */
export function ContextMenuItemLabel(props: ContextMenuItemLabelProps) {
  return <span className={contextMenuItemLabelVariants()} {...props} />;
}
