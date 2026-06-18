import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import type * as React from "react";

import { contextMenuItemVariants } from "./variants";

export type ContextMenuItemProps = Omit<
  React.ComponentProps<typeof BaseContextMenu.Item>,
  "className" | "style"
>;

/** An interactive menu row. Wraps `ContextMenu.Item` 1:1. */
export function ContextMenuItem(props: ContextMenuItemProps) {
  return <BaseContextMenu.Item className={contextMenuItemVariants()} {...props} />;
}
