import { Toast as BaseToast } from "@base-ui/react/toast";

export type ToastPortalProps = BaseToast.Portal.Props;

/**
 * Moves the toast viewport to a different part of the DOM so it escapes local stacking contexts.
 * Maps 1:1 to `Toast.Portal`.
 */
export function ToastPortal(props: ToastPortalProps) {
  return <BaseToast.Portal {...props} />;
}
