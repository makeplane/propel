import type * as React from "react";

import { navigationMenuLinkTitleVariants } from "./variants";

export type NavigationMenuLinkTitleProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
> & {
  /** The link's navigable label text. */
  children?: React.ReactNode;
};

/**
 * The primary line of a `presentation="card"` `NavigationMenuLink`: the navigable label. Pairs with
 * an optional `NavigationMenuLinkDescription` below it.
 */
export function NavigationMenuLinkTitle(props: NavigationMenuLinkTitleProps) {
  return <span className={navigationMenuLinkTitleVariants()} {...props} />;
}
