import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";

export type AlertDialogProps = Omit<BaseAlertDialog.Root.Props, "className" | "style">;

/**
 * The alert dialog Root — Base UI's context/state provider (renders no element of its own). Always
 * modal and non-dismissible, so it requires an explicit user response. A behavior-only role, so it
 * lives in `components` (rules 1a, 2); the styled parts live in `elements/alert-dialog` and are
 * grafted onto Base UI behavior here.
 */
export function AlertDialog(props: AlertDialogProps) {
  return <BaseAlertDialog.Root {...props} />;
}
