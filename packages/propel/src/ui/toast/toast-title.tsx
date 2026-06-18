import { Toast as BaseToast } from "@base-ui/react/toast";
import type * as React from "react";

import { toastTitleVariants } from "./variants";

export type ToastTitleProps = Omit<
  React.ComponentProps<typeof BaseToast.Title>,
  "className" | "style"
>;

/** The accessible title that labels the toast. Maps 1:1 to `Toast.Title`. */
export function ToastTitle(props: ToastTitleProps) {
  return <BaseToast.Title className={toastTitleVariants()} {...props} />;
}
