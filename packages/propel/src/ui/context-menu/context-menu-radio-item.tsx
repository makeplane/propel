import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import type * as React from "react";

import { contextMenuItemVariants } from "./variants";

export type ContextMenuRadioItemProps = Omit<
  React.ComponentProps<typeof BaseContextMenu.RadioItem>,
  "className" | "style"
>;

/** A menu row that behaves like a radio button. Wraps `ContextMenu.RadioItem` 1:1. */
export function ContextMenuRadioItem(props: ContextMenuRadioItemProps) {
  return <BaseContextMenu.RadioItem className={contextMenuItemVariants()} {...props} />;
}
