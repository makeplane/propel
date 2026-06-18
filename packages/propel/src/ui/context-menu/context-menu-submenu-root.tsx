import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import type * as React from "react";

export type ContextMenuSubmenuRootProps = Omit<
  React.ComponentProps<typeof BaseContextMenu.SubmenuRoot>,
  "className" | "style"
>;

/** Groups all parts of a nested submenu. Wraps `ContextMenu.SubmenuRoot` 1:1. */
export function ContextMenuSubmenuRoot(props: ContextMenuSubmenuRootProps) {
  return <BaseContextMenu.SubmenuRoot {...props} />;
}
