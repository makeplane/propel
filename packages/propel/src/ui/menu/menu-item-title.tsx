import type * as React from "react";

import { menuItemTitleVariants } from "./variants";

export type MenuItemTitleProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
>;

/** A row's primary label. Truncates rather than wrapping. */
export function MenuItemTitle(props: MenuItemTitleProps) {
  return <span className={menuItemTitleVariants()} {...props} />;
}
