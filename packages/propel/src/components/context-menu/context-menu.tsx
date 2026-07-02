import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";

export type ContextMenuProps = Omit<BaseContextMenu.Root.Props, "className" | "style">;

/**
 * Root of the context menu — Base UI's context/state provider (renders no element of its own);
 * opens at the pointer on right click or long press. A behavior-only role, so it lives in
 * `components` (rules 1a, 2); the styled parts live in `elements/context-menu` and are grafted onto
 * Base UI behavior here.
 */
export function ContextMenu(props: ContextMenuProps) {
  return <BaseContextMenu.Root {...props} />;
}
