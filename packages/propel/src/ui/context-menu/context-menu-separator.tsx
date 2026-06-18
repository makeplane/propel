import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import type * as React from "react";

import { contextMenuSeparatorVariants } from "./variants";

export type ContextMenuSeparatorProps = Omit<
  React.ComponentProps<typeof BaseContextMenu.Separator>,
  "className" | "style"
>;

/** A thin divider between groups of items. Wraps `ContextMenu.Separator` 1:1. */
export function ContextMenuSeparator(props: ContextMenuSeparatorProps) {
  return <BaseContextMenu.Separator className={contextMenuSeparatorVariants()} {...props} />;
}
