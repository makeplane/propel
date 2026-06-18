import { Drawer as BaseDrawer } from "@base-ui/react/drawer";
import type * as React from "react";

import { drawerCloseVariants } from "./variants";

export type DrawerCloseProps = Omit<
  React.ComponentProps<typeof BaseDrawer.Close>,
  "className" | "style"
>;

/**
 * A control that closes the drawer when activated. Place inside the content for a dismiss button.
 * Maps 1:1 to Base UI's `Drawer.Close`.
 */
export function DrawerClose(props: DrawerCloseProps) {
  return <BaseDrawer.Close className={drawerCloseVariants()} {...props} />;
}
