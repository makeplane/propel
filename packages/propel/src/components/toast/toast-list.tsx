import type * as React from "react";

import { Toast, type ToastData, useToast } from "./toast";

export type ToastListProps = {
  /** The close control node forwarded to each toast's close button (carries its own aria-label). */
  close: React.ReactElement;
};

/**
 * Renders one styled {@link Toast} per queued toast from the manager. Mounted inside
 * {@link ToastProvider}'s viewport — you normally don't render this directly.
 */
export function ToastList({ close }: ToastListProps) {
  const { toasts } = useToast<ToastData>();
  return toasts.map((toast) => <Toast key={toast.id} toast={toast} close={close} />);
}
