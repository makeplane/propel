import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import type * as React from "react";

import { contextMenuArrowVariants } from "./variants";

export type ContextMenuArrowProps = Omit<
  React.ComponentProps<typeof BaseContextMenu.Arrow>,
  "className" | "style"
>;

/** An element pointing from the popup toward its anchor. Wraps `ContextMenu.Arrow` 1:1. */
export function ContextMenuArrow(props: ContextMenuArrowProps) {
  return <BaseContextMenu.Arrow className={contextMenuArrowVariants()} {...props} />;
}
