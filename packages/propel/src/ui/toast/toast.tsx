import { Toast as BaseToast } from "@base-ui/react/toast";
import type * as React from "react";

import { toastRootVariants } from "./variants";

export type ToastProps = Omit<React.ComponentProps<typeof BaseToast.Root>, "className" | "style">;

/**
 * Groups all parts of an individual toast and wires its swipe/dismiss state. Renders the shared
 * floating-card surface. Maps 1:1 to `Toast.Root`.
 */
export function Toast(props: ToastProps) {
  return <BaseToast.Root className={toastRootVariants()} {...props} />;
}
