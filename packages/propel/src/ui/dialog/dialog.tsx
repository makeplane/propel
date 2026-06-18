import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import type * as React from "react";

export type DialogProps = Omit<React.ComponentProps<typeof BaseDialog.Root>, "className" | "style">;

/**
 * The dialog root that wires up open state and accessibility for its parts. Modal by default; pass
 * `disablePointerDismissal` to keep it open on outside clicks. Maps 1:1 to Base UI's
 * `Dialog.Root`.
 */
export function Dialog(props: DialogProps) {
  return <BaseDialog.Root {...props} />;
}
