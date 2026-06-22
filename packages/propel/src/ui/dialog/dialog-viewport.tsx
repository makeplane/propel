import { Dialog as BaseDialog } from "@base-ui/react/dialog";

import { dialogViewportVariants } from "./variants";

export type DialogViewportProps = Omit<BaseDialog.Viewport.Props, "className" | "style">;

/**
 * The full-screen container that centers the popup and provides a scrollable area for tall content.
 * Maps 1:1 to `Dialog.Viewport`.
 */
export function DialogViewport(props: DialogViewportProps) {
  return <BaseDialog.Viewport className={dialogViewportVariants()} {...props} />;
}
