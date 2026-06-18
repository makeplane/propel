import { Drawer as BaseDrawer } from "@base-ui/react/drawer";
import type * as React from "react";

import { drawerViewportVariants } from "./variants";

export type DrawerViewportProps = Omit<
  React.ComponentProps<typeof BaseDrawer.Viewport>,
  "className" | "style"
>;

/**
 * The fixed, full-screen layer that positions the popup against a screen edge. Wraps the
 * `DrawerPopup` and aligns it via layout. Maps 1:1 to Base UI's `Drawer.Viewport`.
 */
export function DrawerViewport(props: DrawerViewportProps) {
  return <BaseDrawer.Viewport className={drawerViewportVariants()} {...props} />;
}
