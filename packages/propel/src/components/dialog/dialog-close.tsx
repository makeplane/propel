import { Dialog as BaseDialog } from "@base-ui/react/dialog";

export type DialogCloseProps = Omit<BaseDialog.Close.Props, "className" | "style">;

/**
 * The behavior that closes the dialog when activated. Use as the `render` target of a `Button` or
 * `IconButton` so the styled primitive's look wins via render-composition:
 *
 * ```tsx
 * <IconButton prominence="ghost" tone="neutral" magnitude="lg" render={<DialogClose />}>
 *   <IconButtonIcon>
 *     <X />
 *   </IconButtonIcon>
 * </IconButton>;
 * ```
 *
 * Maps 1:1 to `Dialog.Close`.
 */
export function DialogClose(props: DialogCloseProps) {
  return <BaseDialog.Close {...props} />;
}
