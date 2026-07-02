import { Popover as BasePopover } from "@base-ui/react/popover";

import { PopoverPanelPopup } from "../../elements/popover";
import { OverlayPanel, type OverlayPanelWidth } from "../../internal/overlay-panel";
import { Positioner } from "../../internal/positioner";

type PopoverContentWidth = OverlayPanelWidth;

export type PopoverContentProps = Omit<BasePopover.Popup.Props, "className" | "style"> & {
  /** Which side of the trigger the panel opens toward. The spec's adjustable placement axis. */
  side: BasePopover.Positioner.Props["side"];
  /** Alignment of the panel relative to the trigger along `side`. The spec's alignment axis. */
  align: BasePopover.Positioner.Props["align"];
  /** Fixed panel width. The spec's adjustable width axis. */
  width: PopoverContentWidth;
  /** Distance in px between the trigger and the panel. @default 4 */
  sideOffset?: BasePopover.Positioner.Props["sideOffset"];
};

/**
 * A generic floating panel surface for arbitrary controls and form content. Composes the popover
 * portal + positioner + the shared elevated overlay panel around a bare scroll-body popup; all
 * styling lives in the `elements` parts it composes.
 */
export function PopoverContent({
  side,
  align,
  width,
  sideOffset = 4,
  ...props
}: PopoverContentProps) {
  return (
    <BasePopover.Portal>
      <BasePopover.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        render={<Positioner />}
      >
        <OverlayPanel elevation="overlay" radius="lg" width={width}>
          <BasePopover.Popup {...props} render={<PopoverPanelPopup />} />
        </OverlayPanel>
      </BasePopover.Positioner>
    </BasePopover.Portal>
  );
}
