import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";

export type ContextMenuBackdropProps = Omit<BaseContextMenu.Backdrop.Props, "className" | "style">;

/** An overlay rendered beneath the menu popup. Wraps `ContextMenu.Backdrop` 1:1. */
export function ContextMenuBackdrop(props: ContextMenuBackdropProps) {
  return <BaseContextMenu.Backdrop {...props} />;
}
