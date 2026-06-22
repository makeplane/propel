import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import { cx } from "class-variance-authority";

import { contextMenuItemVariants } from "./variants";

export type ContextMenuSubmenuTriggerProps = Omit<
  BaseContextMenu.SubmenuTrigger.Props,
  "className" | "style"
>;

/** The row that opens a submenu. Wraps `ContextMenu.SubmenuTrigger` 1:1. */
export function ContextMenuSubmenuTrigger(props: ContextMenuSubmenuTriggerProps) {
  return (
    <BaseContextMenu.SubmenuTrigger
      className={cx(
        contextMenuItemVariants(),
        "group/item data-popup-open:bg-layer-transparent-hover data-popup-open:text-primary",
      )}
      {...props}
    />
  );
}
