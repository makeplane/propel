import { Toast, type ToastData, useToast } from "./toast";

export type ToastListProps = {
  /** Accessible name for each toast's close button. */
  closeLabel: string;
};

/**
 * Renders one styled {@link Toast} per queued toast from the manager. Mounted inside
 * {@link ToastProvider}'s viewport — you normally don't render this directly.
 */
export function ToastList({ closeLabel }: ToastListProps) {
  const { toasts } = useToast<ToastData>();
  return toasts.map((toast) => <Toast key={toast.id} toast={toast} closeLabel={closeLabel} />);
}
