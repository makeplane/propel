import { PreviewCard as BasePreviewCard } from "@base-ui/react/preview-card";

import {
  PreviewCardPopup,
  type PreviewCardPopupProps,
} from "../../elements/preview-card/preview-card-popup";
import { Positioner } from "../../internal/positioner";

export type PreviewCardContentProps = PreviewCardPopupProps & {
  /** Which side of the trigger the card opens toward. @default "bottom" */
  side?: BasePreviewCard.Positioner.Props["side"];
  /** Distance in px between the trigger and the card. @default 4 */
  sideOffset?: BasePreviewCard.Positioner.Props["sideOffset"];
  /** Alignment of the card relative to the trigger along `side`. @default "center" */
  align?: BasePreviewCard.Positioner.Props["align"];
};

/**
 * Convenience that composes the anchored preview card boilerplate — Base UI portal, positioner, and
 * popup grafted onto Propel's styled surface — so a consumer only writes the trigger and the card
 * body. Pass `side`/`sideOffset`/`align` through to the positioner.
 *
 * No backdrop: unlike Dialog/AlertDialog/Drawer, a preview card is a non-modal, hover-triggered
 * rich tooltip (it opens on hover/focus and closes on pointer-leave/blur, with no focus trap) —
 * dimming the page behind a hover preview reads as a modal takeover it isn't. Base UI ships a
 * `PreviewCard.Backdrop` primitive, but it is purely optional/decorative for apps that want one; it
 * has none of `Dialog.Backdrop`'s click-outside-to-dismiss semantics, so omitting it costs no
 * behavior.
 */
export function PreviewCardContent({
  side = "bottom",
  sideOffset = 4,
  align = "center",
  ...props
}: PreviewCardContentProps) {
  return (
    <BasePreviewCard.Portal>
      <BasePreviewCard.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        render={<Positioner />}
      >
        <BasePreviewCard.Popup {...props} render={<PreviewCardPopup />} />
      </BasePreviewCard.Positioner>
    </BasePreviewCard.Portal>
  );
}
