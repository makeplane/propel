import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";

export type ContextMenuSubmenuProps = Omit<
  BaseContextMenu.SubmenuRoot.Props,
  "className" | "style"
>;

/** Groups all parts of a nested submenu. Wraps `ContextMenu.SubmenuRoot` 1:1. */
export function ContextMenuSubmenu(props: ContextMenuSubmenuProps) {
  return <BaseContextMenu.SubmenuRoot {...props} />;
}
