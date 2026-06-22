import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";

import { alertDialogCloseVariants } from "./variants";

export type AlertDialogCloseProps = Omit<BaseAlertDialog.Close.Props, "className" | "style">;

/**
 * A button that closes the alert dialog when activated. Renders a ghost button by default; children
 * are optional. Maps 1:1 to `AlertDialog.Close`.
 */
export function AlertDialogClose(props: AlertDialogCloseProps) {
  return <BaseAlertDialog.Close className={alertDialogCloseVariants()} {...props} />;
}
