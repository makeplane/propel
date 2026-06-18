import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import type * as React from "react";

import { dialogCloseVariants } from "./variants";

export type DialogCloseProps = Omit<
  React.ComponentProps<typeof BaseDialog.Close>,
  "className" | "style"
>;

/**
 * A button that closes the dialog when activated. Renders a ghost button by default; children are
 * optional. Maps 1:1 to `Dialog.Close`.
 */
export function DialogClose(props: DialogCloseProps) {
  return <BaseDialog.Close className={dialogCloseVariants()} {...props} />;
}
