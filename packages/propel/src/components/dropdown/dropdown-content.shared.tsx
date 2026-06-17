import { Menu } from "@base-ui/react/menu";
import type * as React from "react";

import { OverlayPanel, type OverlayPanelWidth } from "../../internal/overlay-panel";

export type DropdownContentWidth = OverlayPanelWidth;

export type DropdownContentProps = Omit<
  React.ComponentProps<typeof Menu.Popup>,
  "className" | "style"
> & {
  /** Which side of the trigger the menu opens toward. @default "bottom" */
  side?: React.ComponentProps<typeof Menu.Positioner>["side"];
  /** Distance in px between the trigger and the menu. @default 4 */
  sideOffset?: React.ComponentProps<typeof Menu.Positioner>["sideOffset"];
  /** Alignment of the menu relative to the trigger along `side`. @default "start" */
  align?: React.ComponentProps<typeof Menu.Positioner>["align"];
  /** Fixed menu width. @default "anchor" */
  width?: DropdownContentWidth;
  /** Sticky chrome pinned above the role="menu" popup. */
  search?: React.ReactNode;
  /** Sticky chrome pinned below the role="menu" popup. */
  footer?: React.ReactNode;
};

export function DropdownPopup({
  children,
  side,
  sideOffset,
  align,
  width,
  search,
  footer,
  ...props
}: DropdownContentProps & {
  side: React.ComponentProps<typeof Menu.Positioner>["side"];
  sideOffset: React.ComponentProps<typeof Menu.Positioner>["sideOffset"];
  align: React.ComponentProps<typeof Menu.Positioner>["align"];
}) {
  return (
    <Menu.Portal>
      <Menu.Positioner side={side} sideOffset={sideOffset} align={align} className="outline-none">
        <OverlayPanel elevation="overlay" radius="lg" width={width} header={search} footer={footer}>
          <Menu.Popup className="p-1 outline-none" {...props}>
            {children}
          </Menu.Popup>
        </OverlayPanel>
      </Menu.Positioner>
    </Menu.Portal>
  );
}
