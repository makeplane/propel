import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import type * as React from "react";

export type ContextMenuProps = Omit<
  React.ComponentProps<typeof BaseContextMenu.Root>,
  "className" | "style"
>;

/**
 * Root of the context menu. Wraps `ContextMenu.Root` 1:1; opens at the pointer on right click or
 * long press.
 */
export function ContextMenu(props: ContextMenuProps) {
  return <BaseContextMenu.Root {...props} />;
}
