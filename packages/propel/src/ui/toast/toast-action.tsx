import { Toast as BaseToast } from "@base-ui/react/toast";

import { toastActionVariants } from "./variants";

export type ToastActionProps = Omit<BaseToast.Action.Props, "className" | "style">;

/** An action button that participates in the toast's focus management. Maps 1:1 to `Toast.Action`. */
export function ToastAction(props: ToastActionProps) {
  return <BaseToast.Action className={toastActionVariants()} {...props} />;
}
