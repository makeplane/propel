import { Toast, type ToastData, useToast } from "./toast";

/**
 * Renders one styled {@link Toast} per queued toast from the manager. Mounted inside
 * {@link ToastProvider}'s viewport — you normally don't render this directly.
 */
export function ToastList() {
  const { toasts } = useToast<ToastData>();
  return toasts.map((toast) => <Toast key={toast.id} toast={toast} />);
}
