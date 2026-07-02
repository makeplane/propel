import { Dialog as BaseDialog } from "@base-ui/react/dialog";

export type DialogTriggerProps = Omit<BaseDialog.Trigger.Props, "className" | "style">;

/**
 * The behavior that opens the dialog. Use as the `render` target of a `Button` so the styled
 * primitive's look wins via render-composition:
 *
 * ```tsx
 * <Button prominence="secondary" tone="neutral" magnitude="xl" render={<DialogTrigger />}>
 *   Open dialog
 * </Button>;
 * ```
 *
 * Base UI manages `aria-haspopup`/`aria-expanded` and focus restoration when the dialog closes.
 * Maps 1:1 to `Dialog.Trigger`.
 */
export function DialogTrigger(props: DialogTriggerProps) {
  return <BaseDialog.Trigger {...props} />;
}
