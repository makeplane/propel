import {
  DialogBackdrop,
  DialogPopup,
  type DialogPopupProps,
  DialogPortal,
  DialogViewport,
} from "../../ui/dialog";

export type DialogContentProps = DialogPopupProps;

/**
 * Convenience that composes the dialog overlay boilerplate — portal, backdrop, centering viewport,
 * and the centered popup — so a consumer only writes the trigger and the popup body.
 */
export function DialogContent({ children, ...props }: DialogContentProps) {
  return (
    <DialogPortal>
      <DialogBackdrop />
      <DialogViewport>
        <DialogPopup {...props}>{children}</DialogPopup>
      </DialogViewport>
    </DialogPortal>
  );
}
