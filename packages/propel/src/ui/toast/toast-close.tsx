import { Toast as BaseToast } from "@base-ui/react/toast";
import type * as React from "react";

import { toastCloseVariants } from "./variants";

export type ToastCloseProps = Omit<
  React.ComponentProps<typeof BaseToast.Close>,
  "className" | "style"
>;

/** A button that dismisses the toast when activated. Maps 1:1 to `Toast.Close`. */
export function ToastClose(props: ToastCloseProps) {
  return <BaseToast.Close className={toastCloseVariants()} {...props} />;
}
