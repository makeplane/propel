import { Drawer as BaseDrawer } from "@base-ui/react/drawer";

import { drawerPopupVariants } from "./variants";

export type DrawerPopupProps = Omit<BaseDrawer.Popup.Props, "className" | "style">;

/**
 * The sliding panel itself. Defaults to a right-edge drawer that slides in/out using Base UI's
 * `data-starting-style`/`data-ending-style` transforms. Maps 1:1 to Base UI's `Drawer.Popup`.
 */
export function DrawerPopup(props: DrawerPopupProps) {
  return <BaseDrawer.Popup className={drawerPopupVariants()} {...props} />;
}
