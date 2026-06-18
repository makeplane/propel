import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";
import type * as React from "react";

import { alertDialogCloseVariants } from "./variants";

export type AlertDialogCloseProps = Omit<
  React.ComponentProps<typeof BaseAlertDialog.Close>,
  "className" | "style"
>;

/**
 * A button that closes the alert dialog when activated. Renders a ghost button by default; children
 * are optional. Maps 1:1 to `AlertDialog.Close`.
 */
export function AlertDialogClose(props: AlertDialogCloseProps) {
  return <BaseAlertDialog.Close className={alertDialogCloseVariants()} {...props} />;
}
