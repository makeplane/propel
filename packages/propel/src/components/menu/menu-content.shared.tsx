import { Menu as BaseMenu } from "@base-ui/react/menu";
import type * as React from "react";

import { OverlayPanel, type OverlayPanelWidth } from "../../internal/overlay-panel";
import { MenuPopup, MenuPortal, MenuPositioner } from "../../ui/menu";

export type MenuContentWidth = OverlayPanelWidth;

export type MenuContentProps = Omit<BaseMenu.Popup.Props, "className" | "style"> & {
  /** Which side of the trigger the menu opens toward. @default "bottom" */
  side?: BaseMenu.Positioner.Props["side"];
  /** Distance in px between the trigger and the menu. @default 4 */
  sideOffset?: BaseMenu.Positioner.Props["sideOffset"];
  /** Alignment of the menu relative to the trigger along `side`. @default "start" */
  align?: BaseMenu.Positioner.Props["align"];
  /** Fixed menu width. @default "anchor" */
  width?: MenuContentWidth;
  /** Sticky chrome pinned above the role="menu" popup. */
  search?: React.ReactNode;
  /** Sticky chrome pinned below the role="menu" popup. */
  footer?: React.ReactNode;
};

export function MenuContentSurface({
  side,
  sideOffset,
  align,
  width,
  search,
  footer,
  ...props
}: MenuContentProps & {
  side: BaseMenu.Positioner.Props["side"];
  sideOffset: BaseMenu.Positioner.Props["sideOffset"];
  align: BaseMenu.Positioner.Props["align"];
}) {
  return (
    <MenuPortal>
      <MenuPositioner side={side} sideOffset={sideOffset} align={align}>
        <OverlayPanel elevation="overlay" radius="lg" width={width} header={search} footer={footer}>
          <MenuPopup surface="inset" {...props} />
        </OverlayPanel>
      </MenuPositioner>
    </MenuPortal>
  );
}
