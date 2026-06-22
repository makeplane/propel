import { Dialog as BaseDialog } from "@base-ui/react/dialog";

export type DialogProps = Omit<BaseDialog.Root.Props, "className" | "style">;

/**
 * The dialog root that wires up open state and accessibility for its parts. Modal by default; pass
 * `disablePointerDismissal` to keep it open on outside clicks. Maps 1:1 to Base UI's
 * `Dialog.Root`.
 */
export function Dialog(props: DialogProps) {
  return <BaseDialog.Root {...props} />;
}
