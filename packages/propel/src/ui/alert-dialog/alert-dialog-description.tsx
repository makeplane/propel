import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";

import { alertDialogDescriptionVariants } from "./variants";

export type AlertDialogDescriptionProps = Omit<
  BaseAlertDialog.Description.Props,
  "className" | "style"
>;

/**
 * The supporting description for the alert dialog. Base UI links it to the popup via
 * `aria-describedby`. Maps 1:1 to `AlertDialog.Description`.
 */
export function AlertDialogDescription(props: AlertDialogDescriptionProps) {
  return <BaseAlertDialog.Description className={alertDialogDescriptionVariants()} {...props} />;
}
