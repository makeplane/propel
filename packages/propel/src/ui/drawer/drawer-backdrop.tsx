import { Drawer as BaseDrawer } from "@base-ui/react/drawer";
import type * as React from "react";

import { drawerBackdropVariants } from "./variants";

export type DrawerBackdropProps = Omit<
  React.ComponentProps<typeof BaseDrawer.Backdrop>,
  "className" | "style"
>;

/**
 * The dimmed overlay behind the drawer. Fades in/out via Base UI's
 * `data-starting-style`/`data-ending-style` transition hooks. Maps 1:1 to Base UI's
 * `Drawer.Backdrop`.
 */
export function DrawerBackdrop(props: DrawerBackdropProps) {
  return <BaseDrawer.Backdrop className={drawerBackdropVariants()} {...props} />;
}
