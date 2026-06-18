import { Drawer as BaseDrawer } from "@base-ui/react/drawer";
import type * as React from "react";

export type DrawerIndentProps = Omit<
  React.ComponentProps<typeof BaseDrawer.Indent>,
  "className" | "style"
>;

/**
 * Wraps page content that should scale/shift inward as the drawer opens (the indent effect). Place
 * inside a `DrawerProvider`, around the `Drawer` root and your page. Maps 1:1 to Base UI's
 * `Drawer.Indent`.
 */
export function DrawerIndent(props: DrawerIndentProps) {
  return <BaseDrawer.Indent {...props} />;
}
