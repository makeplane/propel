import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";

import { contextMenuPositionerVariants } from "./variants";

export type ContextMenuPositionerProps = Omit<
  BaseContextMenu.Positioner.Props,
  "className" | "style"
>;

/** Positions the popup against the pointer. Wraps `ContextMenu.Positioner` 1:1. */
export function ContextMenuPositioner(props: ContextMenuPositionerProps) {
  return <BaseContextMenu.Positioner className={contextMenuPositionerVariants()} {...props} />;
}
