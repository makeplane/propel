import { Dialog as BaseDialog } from "@base-ui/react/dialog";

import { dialogBackdropVariants } from "./variants";

export type DialogBackdropProps = Omit<BaseDialog.Backdrop.Props, "className" | "style">;

/**
 * The dimmed overlay behind the popup. Fades with the dialog's open state via Base UI's
 * starting/ending transition styles. Maps 1:1 to `Dialog.Backdrop`.
 */
export function DialogBackdrop(props: DialogBackdropProps) {
  return <BaseDialog.Backdrop className={dialogBackdropVariants()} {...props} />;
}
