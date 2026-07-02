import { Drawer as BaseDrawer } from "@base-ui/react/drawer";
import type * as React from "react";

import {
  DrawerContent,
  DrawerPopup,
  type DrawerPopupSide,
  DrawerViewport,
} from "../../elements/drawer";
import { DrawerBackdrop } from "./drawer-backdrop";

export type DrawerPanelProps = Omit<
  BaseDrawer.Popup.Props,
  "className" | "style" | "render" | "children"
> & {
  /**
   * The viewport edge the drawer is anchored to. "end" pins to the inline-end (right in LTR);
   * "start" pins to the inline-start (left in LTR). The slide animation direction and the
   * leading-edge shadow border both follow this value.
   */
  side: DrawerPopupSide;
  /** The panel body — typically a `DrawerHeader`, `DrawerBody`, and `DrawerFooter`. */
  children?: React.ReactNode;
};

/**
 * Convenience that composes the drawer overlay boilerplate — portal, backdrop, edge viewport,
 * sliding popup, and the padded inner content region — so a consumer only writes the trigger and
 * the panel body. Pass `side` to choose which viewport edge the drawer anchors to. Each Base UI
 * behavior part is grafted onto its styled `elements` element via `render`.
 *
 * Named `DrawerPanel` to avoid clashing with the atomic `DrawerContent` part (the padded inner
 * content region), which this convenience composes internally.
 */
export function DrawerPanel({ side, children, ...props }: DrawerPanelProps) {
  return (
    <BaseDrawer.Portal>
      <DrawerBackdrop />
      <BaseDrawer.Viewport render={<DrawerViewport />}>
        <BaseDrawer.Popup {...props} render={<DrawerPopup side={side} />}>
          <BaseDrawer.Content render={<DrawerContent />}>{children}</BaseDrawer.Content>
        </BaseDrawer.Popup>
      </BaseDrawer.Viewport>
    </BaseDrawer.Portal>
  );
}
