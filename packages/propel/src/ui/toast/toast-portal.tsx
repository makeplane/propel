import { Toast as BaseToast } from "@base-ui/react/toast";
import type * as React from "react";

export type ToastPortalProps = React.ComponentProps<typeof BaseToast.Portal>;

/**
 * Moves the toast viewport to a different part of the DOM so it escapes local stacking contexts.
 * Maps 1:1 to `Toast.Portal`.
 */
export function ToastPortal(props: ToastPortalProps) {
  return <BaseToast.Portal {...props} />;
}
