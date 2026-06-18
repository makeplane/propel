import { Menu as BaseMenu } from "@base-ui/react/menu";
import type * as React from "react";

import { OverlayPanel, type OverlayPanelWidth } from "../../internal/overlay-panel";

export type MenuContentWidth = OverlayPanelWidth;

export type MenuContentProps = Omit<
  React.ComponentProps<typeof BaseMenu.Popup>,
  "className" | "style"
> & {
  /** Which side of the trigger the menu opens toward. @default "bottom" */
  side?: React.ComponentProps<typeof BaseMenu.Positioner>["side"];
  /** Distance in px between the trigger and the menu. @default 4 */
  sideOffset?: React.ComponentProps<typeof BaseMenu.Positioner>["sideOffset"];
  /** Alignment of the menu relative to the trigger along `side`. @default "start" */
  align?: React.ComponentProps<typeof BaseMenu.Positioner>["align"];
  /** Fixed menu width. @default "anchor" */
  width?: MenuContentWidth;
  /** Sticky chrome pinned above the role="menu" popup. */
  search?: React.ReactNode;
  /** Sticky chrome pinned below the role="menu" popup. */
  footer?: React.ReactNode;
};

export function MenuContentSurface({
  children,
  side,
  sideOffset,
  align,
  width,
  search,
  footer,
  ...props
}: MenuContentProps & {
  side: React.ComponentProps<typeof BaseMenu.Positioner>["side"];
  sideOffset: React.ComponentProps<typeof BaseMenu.Positioner>["sideOffset"];
  align: React.ComponentProps<typeof BaseMenu.Positioner>["align"];
}) {
  return (
    <BaseMenu.Portal>
      <BaseMenu.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        className="outline-none"
      >
        <OverlayPanel elevation="overlay" radius="lg" width={width} header={search} footer={footer}>
          <BaseMenu.Popup className="p-1 outline-none" {...props}>
            {children}
          </BaseMenu.Popup>
        </OverlayPanel>
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  );
}
