import { Toast as BaseToast } from "@base-ui/react/toast";

import { toastDescriptionVariants } from "./variants";

export type ToastDescriptionProps = Omit<BaseToast.Description.Props, "className" | "style">;

/** The supporting description for the toast. Maps 1:1 to `Toast.Description`. */
export function ToastDescription(props: ToastDescriptionProps) {
  return <BaseToast.Description className={toastDescriptionVariants()} {...props} />;
}
