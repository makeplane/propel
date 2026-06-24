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
 *
 * `magnitude` is required and forwarded to `DialogPopup` to set the dialog width (`sm` = 320 px,
 * `md` = 384 px, `lg` = 512 px).
 */
export function DialogContent(props: DialogContentProps) {
  return (
    <DialogPortal>
      <DialogBackdrop />
      <DialogViewport>
        <DialogPopup {...props} />
      </DialogViewport>
    </DialogPortal>
  );
}
