import { Toast, type ToastData, useToast } from "./toast";

export function ToastList() {
  const { toasts } = useToast<ToastData>();
  return toasts.map((toast) => <Toast key={toast.id} toast={toast} />);
}
