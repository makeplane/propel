import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";

import { alertDialogViewportVariants } from "./variants";

export type AlertDialogViewportProps = Omit<BaseAlertDialog.Viewport.Props, "className" | "style">;

/**
 * The full-screen container that centers the popup and provides a scrollable area for tall content.
 * Maps 1:1 to `AlertDialog.Viewport`.
 */
export function AlertDialogViewport(props: AlertDialogViewportProps) {
  return <BaseAlertDialog.Viewport className={alertDialogViewportVariants()} {...props} />;
}
