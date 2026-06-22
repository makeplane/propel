import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";

import { contextMenuItemVariants } from "./variants";

export type ContextMenuRadioItemProps = Omit<
  BaseContextMenu.RadioItem.Props,
  "className" | "style"
>;

/** A menu row that behaves like a radio button. Wraps `ContextMenu.RadioItem` 1:1. */
export function ContextMenuRadioItem(props: ContextMenuRadioItemProps) {
  return <BaseContextMenu.RadioItem className={contextMenuItemVariants()} {...props} />;
}
