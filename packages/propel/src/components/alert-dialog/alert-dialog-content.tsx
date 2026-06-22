import {
  AlertDialogBackdrop,
  AlertDialogPopup,
  type AlertDialogPopupProps,
  AlertDialogPortal,
  AlertDialogViewport,
} from "../../ui/alert-dialog";

export type AlertDialogContentProps = AlertDialogPopupProps;

/**
 * Convenience that composes the alert dialog overlay boilerplate — portal, backdrop, centering
 * viewport, and the centered popup — so a consumer only writes the trigger and the popup body.
 */
export function AlertDialogContent(props: AlertDialogContentProps) {
  return (
    <AlertDialogPortal>
      <AlertDialogBackdrop />
      <AlertDialogViewport>
        <AlertDialogPopup {...props} />
      </AlertDialogViewport>
    </AlertDialogPortal>
  );
}
