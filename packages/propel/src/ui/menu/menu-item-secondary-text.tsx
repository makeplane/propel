import type * as React from "react";

import { menuItemSecondaryTextVariants } from "./variants";

export type MenuItemSecondaryTextProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
>;

/** Muted text shown inline after the title (e.g. a translation or a hint). */
export function MenuItemSecondaryText(props: MenuItemSecondaryTextProps) {
  return <span className={menuItemSecondaryTextVariants()} {...props} />;
}
