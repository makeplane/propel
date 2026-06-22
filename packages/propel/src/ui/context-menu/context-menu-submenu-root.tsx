import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";

export type ContextMenuSubmenuRootProps = Omit<
  BaseContextMenu.SubmenuRoot.Props,
  "className" | "style"
>;

/** Groups all parts of a nested submenu. Wraps `ContextMenu.SubmenuRoot` 1:1. */
export function ContextMenuSubmenuRoot(props: ContextMenuSubmenuRootProps) {
  return <BaseContextMenu.SubmenuRoot {...props} />;
}
