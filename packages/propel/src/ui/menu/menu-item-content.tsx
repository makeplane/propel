import type * as React from "react";

import { menuItemContentVariants } from "./variants";

export type MenuItemContentProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
>;

/**
 * The text column of a row. Grows to fill the row so trailing nodes/indicators sit at the
 * inline-end, and stacks a `MenuItemTitleRow` over an optional `MenuItemDescription`.
 */
export function MenuItemContent(props: MenuItemContentProps) {
  return <span className={menuItemContentVariants()} {...props} />;
}
