import { Drawer as BaseDrawer } from "@base-ui/react/drawer";

export type DrawerPortalProps = Omit<BaseDrawer.Portal.Props, "className" | "style">;

/**
 * Portals the backdrop, viewport, and popup out to the end of the document body so the drawer
 * escapes overflow/stacking contexts. Maps 1:1 to Base UI's `Drawer.Portal`.
 */
export function DrawerPortal(props: DrawerPortalProps) {
  return <BaseDrawer.Portal {...props} />;
}
