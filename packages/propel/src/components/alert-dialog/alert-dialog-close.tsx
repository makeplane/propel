import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";

export type AlertDialogCloseProps = Omit<BaseAlertDialog.Close.Props, "className" | "style">;

/**
 * The behavior that closes the alert dialog when activated. Use as the `render` target of a
 * `Button` so the styled primitive's look wins via render-composition:
 *
 * ```tsx
 * <Button prominence="secondary" tone="neutral" magnitude="xl" render={<AlertDialogClose />}>
 *   Cancel
 * </Button>;
 * ```
 *
 * Maps 1:1 to `AlertDialog.Close`.
 */
export function AlertDialogClose(props: AlertDialogCloseProps) {
  return <BaseAlertDialog.Close {...props} />;
}
