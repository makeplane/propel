import { PreviewCard as BasePreviewCard } from "@base-ui/react/preview-card";

import {
  PreviewCardPopup,
  type PreviewCardPopupProps,
} from "../../elements/preview-card/preview-card-popup";
import { Backdrop } from "../../internal/backdrop";
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
 * Convenience that composes the anchored preview card boilerplate — Base UI portal, backdrop,
 * positioner, and popup grafted onto Propel's styled surfaces — so a consumer only writes the
 * trigger and the card body. Pass `side`/`sideOffset`/`align` through to the positioner.
 */
export function PreviewCardContent({
  side = "bottom",
  sideOffset = 4,
  align = "center",
  ...props
}: PreviewCardContentProps) {
  return (
    <BasePreviewCard.Portal>
      <BasePreviewCard.Backdrop render={<Backdrop />} />
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
