import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";

import { type ContextMenuItemVariantProps, contextMenuItemVariants } from "./variants";

export type { ContextMenuItemVariantProps } from "./variants";

export type ContextMenuItemProps = Omit<BaseContextMenu.Item.Props, "className" | "style"> &
  ContextMenuItemVariantProps;

/** An interactive menu row. Wraps `ContextMenu.Item` 1:1. */
export function ContextMenuItem({ tone, ...props }: ContextMenuItemProps) {
  return <BaseContextMenu.Item className={contextMenuItemVariants({ tone })} {...props} />;
}
