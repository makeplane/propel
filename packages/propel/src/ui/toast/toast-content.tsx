import { Toast as BaseToast } from "@base-ui/react/toast";

import { toastContentVariants } from "./variants";

export type ToastContentProps = Omit<BaseToast.Content.Props, "className" | "style">;

/**
 * A container for the contents of a toast (title, description, actions). Maps 1:1 to
 * `Toast.Content`.
 */
export function ToastContent(props: ToastContentProps) {
  return <BaseToast.Content className={toastContentVariants()} {...props} />;
}
