import { Drawer as BaseDrawer } from "@base-ui/react/drawer";
import type * as React from "react";

export type DrawerPortalProps = Omit<
  React.ComponentProps<typeof BaseDrawer.Portal>,
  "className" | "style"
>;

/**
 * Portals the backdrop, viewport, and popup out to the end of the document body so the drawer
 * escapes overflow/stacking contexts. Maps 1:1 to Base UI's `Drawer.Portal`.
 */
export function DrawerPortal(props: DrawerPortalProps) {
  return <BaseDrawer.Portal {...props} />;
}
