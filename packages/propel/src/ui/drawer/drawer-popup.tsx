import { Drawer as BaseDrawer } from "@base-ui/react/drawer";

import { drawerPopupVariants } from "./variants";

export type DrawerPopupSide = "start" | "end";

export type DrawerPopupProps = Omit<BaseDrawer.Popup.Props, "className" | "style"> & {
  /**
   * The viewport edge the drawer is anchored to. "end" pins to the inline-end (right in LTR);
   * "start" pins to the inline-start (left in LTR). The slide animation direction and the
   * leading-edge shadow border both follow this value.
   */
  side: DrawerPopupSide;
};

/**
 * The sliding panel itself. Anchored to `side` ("start" or "end") and slides in/out using Base UI's
 * `data-starting-style`/`data-ending-style` transforms. Maps 1:1 to Base UI's `Drawer.Popup`.
 */
export function DrawerPopup({ side, ...props }: DrawerPopupProps) {
  return <BaseDrawer.Popup className={drawerPopupVariants({ side })} {...props} />;
}
