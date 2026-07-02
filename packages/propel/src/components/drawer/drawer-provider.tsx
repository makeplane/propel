import { Drawer as BaseDrawer } from "@base-ui/react/drawer";
import type * as React from "react";

export type DrawerProviderProps = Omit<BaseDrawer.Provider.Props, "className" | "style"> & {
  /** The `Drawer`(s) and any `DrawerIndent`/`DrawerIndentBackground` to coordinate. */
  children?: React.ReactNode;
};

/**
 * Optional context wrapper that coordinates indent effects across sibling drawers. Wrap `Drawer`
 * (and any `DrawerIndent`/`DrawerIndentBackground`) in it when you need the page to shift as the
 * drawer opens. A behavior-only provider role (rules 1a, 2), so it lives in `components`. Maps 1:1
 * to Base UI's `Drawer.Provider`.
 */
export function DrawerProvider(props: DrawerProviderProps) {
  return <BaseDrawer.Provider {...props} />;
}
