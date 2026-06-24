import type * as React from "react";

import { navigationMenuLinkDescriptionVariants } from "./variants";

export type NavigationMenuLinkDescriptionProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
>;

/**
 * The optional secondary line of a `variant="card"` `NavigationMenuLink`: a muted description shown
 * below the `NavigationMenuLinkTitle`.
 */
export function NavigationMenuLinkDescription(props: NavigationMenuLinkDescriptionProps) {
  return <span className={navigationMenuLinkDescriptionVariants()} {...props} />;
}
