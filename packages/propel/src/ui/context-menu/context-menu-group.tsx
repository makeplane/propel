import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import type * as React from "react";

export type ContextMenuGroupProps = Omit<
  React.ComponentProps<typeof BaseContextMenu.Group>,
  "className" | "style"
>;

/** Groups related items so a `ContextMenuGroupLabel` can title them. Wraps `ContextMenu.Group` 1:1. */
export function ContextMenuGroup(props: ContextMenuGroupProps) {
  return <BaseContextMenu.Group {...props} />;
}
