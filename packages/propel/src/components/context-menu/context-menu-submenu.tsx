import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";

export type ContextMenuSubmenuProps = Omit<
  BaseContextMenu.SubmenuRoot.Props,
  "className" | "style"
>;

/**
 * Groups all parts of a nested submenu — Base UI's submenu context provider (renders no element of
 * its own). A behavior-only role, so it lives in `components` (rules 1a, 2).
 */
export function ContextMenuSubmenu(props: ContextMenuSubmenuProps) {
  return <BaseContextMenu.SubmenuRoot {...props} />;
}
