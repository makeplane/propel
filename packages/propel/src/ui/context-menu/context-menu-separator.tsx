import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";

import { contextMenuSeparatorVariants } from "./variants";

export type ContextMenuSeparatorProps = Omit<
  BaseContextMenu.Separator.Props,
  "className" | "style"
>;

/** A thin divider between groups of items. Wraps `ContextMenu.Separator` 1:1. */
export function ContextMenuSeparator(props: ContextMenuSeparatorProps) {
  return <BaseContextMenu.Separator className={contextMenuSeparatorVariants()} {...props} />;
}
