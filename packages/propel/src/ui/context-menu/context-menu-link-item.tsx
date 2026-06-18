import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import type * as React from "react";

import { contextMenuItemVariants } from "./variants";

export type ContextMenuLinkItemProps = Omit<
  React.ComponentProps<typeof BaseContextMenu.LinkItem>,
  "className" | "style"
>;

/** A navigational `<a>` menu row. Wraps `ContextMenu.LinkItem` 1:1. */
export function ContextMenuLinkItem(props: ContextMenuLinkItemProps) {
  return <BaseContextMenu.LinkItem className={contextMenuItemVariants()} {...props} />;
}
