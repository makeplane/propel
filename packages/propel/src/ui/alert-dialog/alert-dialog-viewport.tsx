import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";
import type * as React from "react";

import { alertDialogViewportVariants } from "./variants";

export type AlertDialogViewportProps = Omit<
  React.ComponentProps<typeof BaseAlertDialog.Viewport>,
  "className" | "style"
>;

/**
 * The full-screen container that centers the popup and provides a scrollable area for tall content.
 * Maps 1:1 to `AlertDialog.Viewport`.
 */
export function AlertDialogViewport(props: AlertDialogViewportProps) {
  return <BaseAlertDialog.Viewport className={alertDialogViewportVariants()} {...props} />;
}
