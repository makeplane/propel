import type * as React from "react";

import { menuItemTrailingVariants } from "./variants";

export type MenuItemTrailingProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
>;

/**
 * A trailing slot at the row's inline-end for arbitrary content (a shortcut, a count, a chevron).
 * Sizes any icon child to the row's `--node-size`; unlike `MenuItemIcon` it adds no tint, so passed
 * content keeps its own color.
 */
export function MenuItemTrailing(props: MenuItemTrailingProps) {
  return <span className={menuItemTrailingVariants()} {...props} />;
}
