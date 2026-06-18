import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import type * as React from "react";

import { dialogPopupVariants } from "./variants";

export type DialogPopupProps = Omit<
  React.ComponentProps<typeof BaseDialog.Popup>,
  "className" | "style"
>;

/**
 * The centered card that holds the dialog content. Scales and fades on open/close using Base UI's
 * `--transform-origin` and starting/ending transition styles. Maps 1:1 to `Dialog.Popup`.
 */
export function DialogPopup(props: DialogPopupProps) {
  return <BaseDialog.Popup className={dialogPopupVariants()} {...props} />;
}
