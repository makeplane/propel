import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";

import { alertDialogPopupVariants } from "./variants";

export type AlertDialogPopupProps = Omit<BaseAlertDialog.Popup.Props, "className" | "style">;

/**
 * The centered card that holds the alert content. Scales and fades on open/close using Base UI's
 * `--transform-origin` and starting/ending transition styles. Maps 1:1 to `AlertDialog.Popup`.
 */
export function AlertDialogPopup(props: AlertDialogPopupProps) {
  return <BaseAlertDialog.Popup className={alertDialogPopupVariants()} {...props} />;
}
