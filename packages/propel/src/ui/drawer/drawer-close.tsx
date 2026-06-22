import { Drawer as BaseDrawer } from "@base-ui/react/drawer";

import { drawerCloseVariants } from "./variants";

export type DrawerCloseProps = Omit<BaseDrawer.Close.Props, "className" | "style">;

/**
 * A control that closes the drawer when activated. Place inside the content for a dismiss button.
 * Maps 1:1 to Base UI's `Drawer.Close`.
 */
export function DrawerClose(props: DrawerCloseProps) {
  return <BaseDrawer.Close className={drawerCloseVariants()} {...props} />;
}
