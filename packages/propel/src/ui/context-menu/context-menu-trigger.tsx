import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import type * as React from "react";

export type ContextMenuTriggerProps = Omit<
  React.ComponentProps<typeof BaseContextMenu.Trigger>,
  "className" | "style"
>;

/** The area that opens the menu on right click or long press. Wraps `ContextMenu.Trigger` 1:1. */
export function ContextMenuTrigger(props: ContextMenuTriggerProps) {
  return <BaseContextMenu.Trigger {...props} />;
}
