import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import type * as React from "react";

import { contextMenuGroupLabelVariants } from "./variants";

export type ContextMenuGroupLabelProps = Omit<
  React.ComponentProps<typeof BaseContextMenu.GroupLabel>,
  "className" | "style"
>;

/** A non-interactive heading associated with its parent group. Wraps `ContextMenu.GroupLabel` 1:1. */
export function ContextMenuGroupLabel(props: ContextMenuGroupLabelProps) {
  return <BaseContextMenu.GroupLabel className={contextMenuGroupLabelVariants()} {...props} />;
}
