import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";
import type * as React from "react";

import { alertDialogTitleVariants } from "./variants";

export type AlertDialogTitleProps = Omit<
  React.ComponentProps<typeof BaseAlertDialog.Title>,
  "className" | "style"
>;

/**
 * The accessible title for the alert dialog. Base UI links it to the popup via `aria-labelledby`.
 * Maps 1:1 to `AlertDialog.Title`.
 */
export function AlertDialogTitle(props: AlertDialogTitleProps) {
  return <BaseAlertDialog.Title className={alertDialogTitleVariants()} {...props} />;
}
