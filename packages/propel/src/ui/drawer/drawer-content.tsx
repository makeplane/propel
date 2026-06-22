import { Drawer as BaseDrawer } from "@base-ui/react/drawer";

import { drawerContentVariants } from "./variants";

export type DrawerContentProps = Omit<BaseDrawer.Content.Props, "className" | "style">;

/**
 * The padded inner content region of the popup. Holds the title, description, body, and close
 * affordances, and allows mouse text selection without triggering swipe-dismiss. Maps 1:1 to Base
 * UI's `Drawer.Content`.
 */
export function DrawerContent(props: DrawerContentProps) {
  return <BaseDrawer.Content className={drawerContentVariants()} {...props} />;
}
