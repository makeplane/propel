import { Popover as BasePopover } from "@base-ui/react/popover";

import { OverlayPanel, type OverlayPanelWidth } from "../../internal/overlay-panel";

type PopoverContentWidth = OverlayPanelWidth;

export type PopoverContentProps = Omit<BasePopover.Popup.Props, "className" | "style"> & {
  /** Which side of the trigger the panel opens toward. @default "bottom" */
  side?: BasePopover.Positioner.Props["side"];
  /** Distance in px between the trigger and the panel. @default 4 */
  sideOffset?: BasePopover.Positioner.Props["sideOffset"];
  /** Alignment of the panel relative to the trigger along `side`. @default "start" */
  align?: BasePopover.Positioner.Props["align"];
  /** Fixed panel width. @default "anchor" */
  width?: PopoverContentWidth;
};

/** A generic floating panel surface for arbitrary controls and form content. */
export function PopoverContent({
  side = "bottom",
  sideOffset = 4,
  align = "start",
  width = "anchor",
  ...props
}: PopoverContentProps) {
  return (
    <BasePopover.Portal>
      <BasePopover.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        className="z-50 outline-none"
      >
        <OverlayPanel elevation="overlay" radius="lg" width={width}>
          <BasePopover.Popup className="p-1 outline-none" {...props} />
        </OverlayPanel>
      </BasePopover.Positioner>
    </BasePopover.Portal>
  );
}
