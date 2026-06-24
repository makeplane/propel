import type * as React from "react";

import { toastActionsVariants } from "./variants";

export type ToastActionsProps = Omit<React.ComponentPropsWithoutRef<"div">, "className" | "style">;

/**
 * The full-width action row beneath a toast's text and optional progress bar. Holds the
 * inline-start `ToastActionGroup` cluster and an optional inline-end `ToastAction`.
 */
export function ToastActions(props: ToastActionsProps) {
  return <div className={toastActionsVariants()} {...props} />;
}
