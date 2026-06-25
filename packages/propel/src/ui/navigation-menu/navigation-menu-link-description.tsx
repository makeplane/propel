import type * as React from "react";

import { navigationMenuLinkDescriptionVariants } from "./variants";

export type NavigationMenuLinkDescriptionProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
> & {
  /** The muted description text shown below the `NavigationMenuLinkTitle`. */
  children?: React.ReactNode;
};

/**
 * The optional secondary line of a `presentation="card"` `NavigationMenuLink`: a muted description
 * shown below the `NavigationMenuLinkTitle`.
 */
export function NavigationMenuLinkDescription(props: NavigationMenuLinkDescriptionProps) {
  return <span className={navigationMenuLinkDescriptionVariants()} {...props} />;
}
