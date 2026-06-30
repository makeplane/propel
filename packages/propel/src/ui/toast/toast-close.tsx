import { Toast as BaseToast } from "@base-ui/react/toast";

export type ToastCloseProps = Omit<BaseToast.Close.Props, "className" | "style">;

/**
 * A behavior wrapper that dismisses the toast when activated. Use as the render target of an
 * `IconButton`; the positioned `ToastCloseSlot` anchors it in the toast's inline-end corner. Maps
 * 1:1 to `Toast.Close`.
 */
export function ToastClose(props: ToastCloseProps) {
  return <BaseToast.Close {...props} />;
}
