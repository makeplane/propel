import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import type * as React from "react";

import { contextMenuItemVariants } from "./variants";

export type ContextMenuCheckboxItemProps = Omit<
  React.ComponentProps<typeof BaseContextMenu.CheckboxItem>,
  "className" | "style"
>;

/** A menu row that toggles a setting on or off. Wraps `ContextMenu.CheckboxItem` 1:1. */
export function ContextMenuCheckboxItem(props: ContextMenuCheckboxItemProps) {
  return <BaseContextMenu.CheckboxItem className={contextMenuItemVariants()} {...props} />;
}
