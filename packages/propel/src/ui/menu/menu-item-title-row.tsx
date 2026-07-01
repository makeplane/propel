import type * as React from "react";

import { menuItemTitleRowVariants } from "./variants";

export type MenuItemTitleRowProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
> & {
  /** The title line — a `MenuItemTitle` and any inline `MenuItemSecondaryText`. */
  children?: React.ReactNode;
};

/** The baseline-aligned line holding a `MenuItemTitle` and any inline `MenuItemSecondaryText`. */
export function MenuItemTitleRow(props: MenuItemTitleRowProps) {
  return <span className={menuItemTitleRowVariants()} {...props} />;
}
