import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";

import { contextMenuItemVariants } from "./variants";

export type ContextMenuLinkItemProps = Omit<BaseContextMenu.LinkItem.Props, "className" | "style">;

/** A navigational `<a>` menu row. Wraps `ContextMenu.LinkItem` 1:1. */
export function ContextMenuLinkItem(props: ContextMenuLinkItemProps) {
  return <BaseContextMenu.LinkItem className={contextMenuItemVariants()} {...props} />;
}
