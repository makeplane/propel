import type * as React from "react";

import { menuItemDescriptionVariants } from "./variants";

export type MenuItemDescriptionProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
> & {
  /** The muted description text shown beneath the title. */
  children?: React.ReactNode;
};

/** A muted second line beneath the title, holding the item's description. */
export function MenuItemDescription(props: MenuItemDescriptionProps) {
  return <span className={menuItemDescriptionVariants()} {...props} />;
}
