import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";

export type AlertDialogTriggerProps = Omit<BaseAlertDialog.Trigger.Props, "className" | "style">;

/**
 * The behavior that opens the alert dialog. Use as the `render` target of a `Button` so the styled
 * primitive's look wins via render-composition:
 *
 * ```tsx
 * <Button prominence="primary" tone="danger" magnitude="xl" render={<AlertDialogTrigger />}>
 *   Delete project
 * </Button>;
 * ```
 *
 * Base UI manages `aria-haspopup`/`aria-expanded` and focus restoration when the alert dialog
 * closes. Maps 1:1 to `AlertDialog.Trigger`.
 */
export function AlertDialogTrigger(props: AlertDialogTriggerProps) {
  return <BaseAlertDialog.Trigger {...props} />;
}
