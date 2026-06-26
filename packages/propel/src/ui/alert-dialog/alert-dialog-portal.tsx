import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";

export type AlertDialogPortalProps = Omit<BaseAlertDialog.Portal.Props, "className" | "style">;

/**
 * Renders the backdrop and popup into a portal so they escape local stacking contexts. Maps 1:1 to
 * `AlertDialog.Portal`.
 */
export function AlertDialogPortal(props: AlertDialogPortalProps) {
  return <BaseAlertDialog.Portal {...props} />;
}
