import type * as React from "react";

import { menuItemControlVariants } from "./variants";

export type MenuItemControlProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
>;

/** The leading control slot of a checkbox/radio row, holding its visual toggle. */
export function MenuItemControl(props: MenuItemControlProps) {
  return <span className={menuItemControlVariants()} {...props} />;
}
