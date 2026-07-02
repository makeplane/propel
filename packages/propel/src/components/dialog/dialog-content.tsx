import { Dialog as BaseDialog } from "@base-ui/react/dialog";

import { DialogPopup, type DialogPopupProps } from "../../elements/dialog/dialog-popup";
import { DialogViewport } from "../../elements/dialog/dialog-viewport";
import { Backdrop } from "../../internal/backdrop";

export type DialogContentProps = DialogPopupProps;

/**
 * Convenience that composes the dialog overlay boilerplate — portal, shared `Backdrop`, centering
 * `DialogViewport`, and the centered `DialogPopup` — so a consumer only writes the trigger and the
 * popup body. Each Base UI behavior part grafts onto its styled element via `render`.
 *
 * `magnitude` is required and forwarded to `DialogPopup` to set the dialog width (`sm` = 320 px,
 * `md` = 384 px, `lg` = 512 px).
 */
export function DialogContent({ magnitude, ...props }: DialogContentProps) {
  return (
    <BaseDialog.Portal>
      <BaseDialog.Backdrop render={<Backdrop />} />
      <BaseDialog.Viewport render={<DialogViewport />}>
        <BaseDialog.Popup {...props} render={<DialogPopup magnitude={magnitude} />} />
      </BaseDialog.Viewport>
    </BaseDialog.Portal>
  );
}
