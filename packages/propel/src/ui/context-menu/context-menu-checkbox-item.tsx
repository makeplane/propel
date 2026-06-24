import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";

import { type ContextMenuItemVariantProps, contextMenuItemVariants } from "./variants";

export type { ContextMenuItemVariantProps } from "./variants";

export type ContextMenuCheckboxItemProps = Omit<
  BaseContextMenu.CheckboxItem.Props,
  "className" | "style"
> &
  ContextMenuItemVariantProps;

/** A menu row that toggles a setting on or off. Wraps `ContextMenu.CheckboxItem` 1:1. */
export function ContextMenuCheckboxItem({ tone, ...props }: ContextMenuCheckboxItemProps) {
  return <BaseContextMenu.CheckboxItem className={contextMenuItemVariants({ tone })} {...props} />;
}
