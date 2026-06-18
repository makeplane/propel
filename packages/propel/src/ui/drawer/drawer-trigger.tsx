import { Drawer as BaseDrawer } from "@base-ui/react/drawer";
import type * as React from "react";

export type DrawerTriggerProps = Omit<
  React.ComponentProps<typeof BaseDrawer.Trigger>,
  "className" | "style"
>;

/**
 * The control that opens the drawer. Base UI wires `aria-haspopup`/`aria-expanded` and reflects
 * open state as data attributes. Compose a `Button` via `render` downstream. Maps 1:1 to Base UI's
 * `Drawer.Trigger`.
 */
export function DrawerTrigger(props: DrawerTriggerProps) {
  return <BaseDrawer.Trigger {...props} />;
}
