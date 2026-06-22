import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";

export type AlertDialogProps = Omit<BaseAlertDialog.Root.Props, "className" | "style">;

/**
 * The alert dialog root that wires up open state and accessibility for its parts. Always modal and
 * non-dismissible, so it requires an explicit user response. Maps 1:1 to Base UI's
 * `AlertDialog.Root`.
 */
export function AlertDialog(props: AlertDialogProps) {
  return <BaseAlertDialog.Root {...props} />;
}
