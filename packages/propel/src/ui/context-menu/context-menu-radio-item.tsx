import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";

import { type ContextMenuItemVariantProps, contextMenuItemVariants } from "./variants";

export type { ContextMenuItemVariantProps } from "./variants";

export type ContextMenuRadioItemProps = Omit<
  BaseContextMenu.RadioItem.Props,
  "className" | "style"
> &
  ContextMenuItemVariantProps;

/** A menu row that behaves like a radio button. Wraps `ContextMenu.RadioItem` 1:1. */
export function ContextMenuRadioItem({ tone, ...props }: ContextMenuRadioItemProps) {
  return <BaseContextMenu.RadioItem className={contextMenuItemVariants({ tone })} {...props} />;
}
