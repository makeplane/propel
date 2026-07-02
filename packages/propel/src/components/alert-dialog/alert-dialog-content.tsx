import { AlertDialog as BaseAlertDialog } from "@base-ui/react/alert-dialog";

import {
  AlertDialogPopup,
  type AlertDialogPopupProps,
} from "../../elements/alert-dialog/alert-dialog-popup";
import { AlertDialogViewport } from "../../elements/alert-dialog/alert-dialog-viewport";
import { Backdrop } from "../../internal/backdrop";

export type AlertDialogContentProps = AlertDialogPopupProps;

/**
 * Convenience that composes the alert dialog overlay boilerplate — Base UI portal, the shared
 * `internal` backdrop, the centering viewport, and the centered popup — so a consumer only writes
 * the trigger and the popup body.
 */
export function AlertDialogContent(props: AlertDialogContentProps) {
  return (
    <BaseAlertDialog.Portal>
      <BaseAlertDialog.Backdrop render={<Backdrop />} />
      <BaseAlertDialog.Viewport render={<AlertDialogViewport />}>
        <BaseAlertDialog.Popup {...props} render={<AlertDialogPopup />} />
      </BaseAlertDialog.Viewport>
    </BaseAlertDialog.Portal>
  );
}
