import { Drawer as BaseDrawer } from "@base-ui/react/drawer";
import type * as React from "react";

import { drawerTitleVariants } from "./variants";

export type DrawerTitleProps = Omit<
  React.ComponentProps<typeof BaseDrawer.Title>,
  "className" | "style"
>;

/**
 * The accessible heading for the drawer. Base UI wires it as the popup's `aria-labelledby` target.
 * Maps 1:1 to Base UI's `Drawer.Title`.
 */
export function DrawerTitle(props: DrawerTitleProps) {
  return <BaseDrawer.Title className={drawerTitleVariants()} {...props} />;
}
