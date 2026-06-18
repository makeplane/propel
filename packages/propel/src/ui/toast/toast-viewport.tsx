import { Toast as BaseToast } from "@base-ui/react/toast";
import type * as React from "react";

import { toastViewportVariants } from "./variants";

export type ToastViewportProps = Omit<
  React.ComponentProps<typeof BaseToast.Viewport>,
  "className" | "style"
>;

/**
 * The fixed container that positions queued toasts and acts as the live region. Maps 1:1 to
 * `Toast.Viewport`.
 */
export function ToastViewport(props: ToastViewportProps) {
  return <BaseToast.Viewport className={toastViewportVariants()} {...props} />;
}
