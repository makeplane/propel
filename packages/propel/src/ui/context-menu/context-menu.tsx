import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";

export type ContextMenuProps = Omit<BaseContextMenu.Root.Props, "className" | "style">;

/**
 * Root of the context menu. Wraps `ContextMenu.Root` 1:1; opens at the pointer on right click or
 * long press.
 */
export function ContextMenu(props: ContextMenuProps) {
  return <BaseContextMenu.Root {...props} />;
}
