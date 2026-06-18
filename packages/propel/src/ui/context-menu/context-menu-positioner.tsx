import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import type * as React from "react";

import { contextMenuPositionerVariants } from "./variants";

export type ContextMenuPositionerProps = Omit<
  React.ComponentProps<typeof BaseContextMenu.Positioner>,
  "className" | "style"
>;

/** Positions the popup against the pointer. Wraps `ContextMenu.Positioner` 1:1. */
export function ContextMenuPositioner(props: ContextMenuPositionerProps) {
  return <BaseContextMenu.Positioner className={contextMenuPositionerVariants()} {...props} />;
}
