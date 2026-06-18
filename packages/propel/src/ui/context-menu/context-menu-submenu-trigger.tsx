import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import { cx } from "class-variance-authority";
import type * as React from "react";

import { contextMenuItemVariants } from "./variants";

export type ContextMenuSubmenuTriggerProps = Omit<
  React.ComponentProps<typeof BaseContextMenu.SubmenuTrigger>,
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
