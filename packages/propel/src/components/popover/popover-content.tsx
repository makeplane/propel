import { Popover as BasePopover } from "@base-ui/react/popover";
import type * as React from "react";

import { OverlayPanel, type OverlayPanelWidth } from "../../internal/overlay-panel";

type PopoverContentWidth = OverlayPanelWidth;

export type PopoverContentProps = Omit<
  React.ComponentProps<typeof BasePopover.Popup>,
  "className" | "style"
> & {
  /** Which side of the trigger the panel opens toward. @default "bottom" */
  side?: React.ComponentProps<typeof BasePopover.Positioner>["side"];
  /** Distance in px between the trigger and the panel. @default 4 */
  sideOffset?: React.ComponentProps<typeof BasePopover.Positioner>["sideOffset"];
  /** Alignment of the panel relative to the trigger along `side`. @default "start" */
  align?: React.ComponentProps<typeof BasePopover.Positioner>["align"];
  /** Fixed panel width. @default "anchor" */
  width?: PopoverContentWidth;
};

/** A generic floating panel surface for arbitrary controls and form content. */
export function PopoverContent({
  children,
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
        className="outline-none"
      >
        <OverlayPanel elevation="overlay" radius="lg" width={width}>
          <BasePopover.Popup className="p-1 outline-none" {...props}>
            {children}
          </BasePopover.Popup>
        </OverlayPanel>
      </BasePopover.Positioner>
    </BasePopover.Portal>
  );
}
