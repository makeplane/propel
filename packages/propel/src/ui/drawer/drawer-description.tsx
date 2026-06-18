import { Drawer as BaseDrawer } from "@base-ui/react/drawer";
import type * as React from "react";

import { drawerDescriptionVariants } from "./variants";

export type DrawerDescriptionProps = Omit<
  React.ComponentProps<typeof BaseDrawer.Description>,
  "className" | "style"
>;

/**
 * Supporting text for the drawer. Base UI wires it as the popup's `aria-describedby` target. Maps
 * 1:1 to Base UI's `Drawer.Description`.
 */
export function DrawerDescription(props: DrawerDescriptionProps) {
  return <BaseDrawer.Description className={drawerDescriptionVariants()} {...props} />;
}
