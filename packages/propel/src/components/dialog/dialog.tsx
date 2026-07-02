import { Dialog as BaseDialog } from "@base-ui/react/dialog";

export type DialogProps = Omit<BaseDialog.Root.Props, "className" | "style">;

/**
 * The dialog Root — Base UI's context/state provider (renders no element of its own). Modal by
 * default; pass `disablePointerDismissal` to keep it open on outside clicks. A behavior-only role,
 * so it lives in `components` (rules 1a, 2); the styled parts live in `elements/dialog` and are
 * grafted onto Base UI behavior here.
 */
export function Dialog(props: DialogProps) {
  return <BaseDialog.Root {...props} />;
}
