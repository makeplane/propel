import type * as React from "react";

import { toastActionVariants } from "./variants";

export type ToastActionButtonProps = Omit<
  React.ComponentPropsWithoutRef<"button">,
  "className" | "style"
>;

/**
 * A plain action button for the inline-start `ToastActionGroup` cluster. Shares the toast
 * action-button styling with `ToastAction`, but unlike `ToastAction` it does not participate in
 * Base UI's toast focus management or dismiss the toast — use it for secondary actions (e.g. Undo)
 * that should not close the toast. Defaults to `type="button"` so it never submits a form.
 */
export function ToastActionButton({ type = "button", ...props }: ToastActionButtonProps) {
  return <button type={type} className={toastActionVariants()} {...props} />;
}
