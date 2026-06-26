import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";

import { type ContextMenuItemVariantProps, contextMenuItemVariants } from "./variants";

export type ContextMenuLinkItemProps = Omit<BaseContextMenu.LinkItem.Props, "className" | "style"> &
  ContextMenuItemVariantProps;

/** A navigational `<a>` menu row. Wraps `ContextMenu.LinkItem` 1:1. */
export function ContextMenuLinkItem({ tone, ...props }: ContextMenuLinkItemProps) {
  return <BaseContextMenu.LinkItem className={contextMenuItemVariants({ tone })} {...props} />;
}
