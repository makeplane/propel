import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import type * as React from "react";

export type ContextMenuBackdropProps = Omit<
  React.ComponentProps<typeof BaseContextMenu.Backdrop>,
  "className" | "style"
>;

/** An overlay rendered beneath the menu popup. Wraps `ContextMenu.Backdrop` 1:1. */
export function ContextMenuBackdrop(props: ContextMenuBackdropProps) {
  return <BaseContextMenu.Backdrop {...props} />;
}
