import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";

import { alertDialogBackdropVariants } from "./variants";

export type AlertDialogBackdropProps = Omit<BaseAlertDialog.Backdrop.Props, "className" | "style">;

/**
 * The dimmed overlay behind the popup. Fades with the dialog's open state via Base UI's
 * starting/ending transition styles. Maps 1:1 to `AlertDialog.Backdrop`.
 */
export function AlertDialogBackdrop(props: AlertDialogBackdropProps) {
  return <BaseAlertDialog.Backdrop className={alertDialogBackdropVariants()} {...props} />;
}
