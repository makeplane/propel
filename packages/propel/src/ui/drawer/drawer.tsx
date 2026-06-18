import { Drawer as BaseDrawer } from "@base-ui/react/drawer";
import type * as React from "react";

export type DrawerProps = Omit<React.ComponentProps<typeof BaseDrawer.Root>, "className" | "style">;

/**
 * The drawer root that holds open state and gesture configuration. Uncontrolled by default; pass
 * `defaultOpen` (uncontrolled) or `open` + `onOpenChange` (controlled). Native props like
 * `swipeDirection` and snap points pass straight through. Maps 1:1 to Base UI's `Drawer.Root`.
 */
export function Drawer(props: DrawerProps) {
  return <BaseDrawer.Root {...props} />;
}
