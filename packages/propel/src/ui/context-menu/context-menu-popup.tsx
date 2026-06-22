import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";

import { contextMenuPopupVariants } from "./variants";

export type ContextMenuPopupProps = Omit<BaseContextMenu.Popup.Props, "className" | "style">;

/** The menu surface that contains the items. Wraps `ContextMenu.Popup` 1:1. */
export function ContextMenuPopup(props: ContextMenuPopupProps) {
  return <BaseContextMenu.Popup className={contextMenuPopupVariants()} {...props} />;
}
