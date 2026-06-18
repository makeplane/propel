import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";
import type * as React from "react";

export type AlertDialogTriggerProps = Omit<
  React.ComponentProps<typeof BaseAlertDialog.Trigger>,
  "className" | "style"
>;

/**
 * The button that opens the alert dialog. Base UI manages `aria-haspopup`/`aria-expanded` and focus
 * restoration when the dialog closes. Maps 1:1 to `AlertDialog.Trigger`.
 */
export function AlertDialogTrigger(props: AlertDialogTriggerProps) {
  return <BaseAlertDialog.Trigger {...props} />;
}
