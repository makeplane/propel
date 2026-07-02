import { Menu as BaseMenu } from "@base-ui/react/menu";
import type * as React from "react";

import { MenuPopup } from "../../elements/menu";
import { OverlayPanel, type OverlayPanelSizing } from "../../internal/overlay-panel";
import { Positioner } from "../../internal/positioner";

export type MenuContentSizing = OverlayPanelSizing;

export type MenuContentProps = Omit<BaseMenu.Popup.Props, "className" | "style"> & {
  /** Which side of the trigger the menu opens toward. @default "bottom" */
  side?: BaseMenu.Positioner.Props["side"];
  /** Distance in px between the trigger and the menu. @default 4 */
  sideOffset?: BaseMenu.Positioner.Props["sideOffset"];
  /** Alignment of the menu relative to the trigger along `side`. @default "start" */
  align?: BaseMenu.Positioner.Props["align"];
  /** How the menu popup sizes itself. @default "anchor" */
  sizing?: MenuContentSizing;
  /** Sticky chrome pinned above the role="menu" popup. */
  search?: React.ReactNode;
  /** Sticky chrome pinned below the role="menu" popup. */
  footer?: React.ReactNode;
};

export function MenuContentSurface({
  side,
  sideOffset,
  align,
  sizing,
  search,
  footer,
  ...props
}: MenuContentProps & {
  side: BaseMenu.Positioner.Props["side"];
  sideOffset: BaseMenu.Positioner.Props["sideOffset"];
  align: BaseMenu.Positioner.Props["align"];
}) {
  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        render={<Positioner />}
      >
        <OverlayPanel
          elevation="overlay"
          radius="lg"
          sizing={sizing}
          header={search}
          footer={footer}
        >
          <BaseMenu.Popup {...props} render={<MenuPopup elevation="flat" />} />
        </OverlayPanel>
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  );
}
