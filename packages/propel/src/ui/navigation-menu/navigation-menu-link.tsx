import { NavigationMenu as BaseNavigationMenu } from "@base-ui/react/navigation-menu";
import type * as React from "react";

import { navigationMenuLinkVariants } from "./variants";

export type NavigationMenuLinkProps = Omit<
  React.ComponentProps<typeof BaseNavigationMenu.Link>,
  "className" | "style"
>;

/**
 * A navigable link, either as a top-level item or inside `Content`. Shares the nav-item chrome with
 * `Trigger`. Maps 1:1 to `NavigationMenu.Link`.
 */
export function NavigationMenuLink(props: NavigationMenuLinkProps) {
  return <BaseNavigationMenu.Link className={navigationMenuLinkVariants()} {...props} />;
}
