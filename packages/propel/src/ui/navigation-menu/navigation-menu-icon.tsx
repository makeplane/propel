import { NavigationMenu as BaseNavigationMenu } from "@base-ui/react/navigation-menu";
import type * as React from "react";

import { navigationMenuIconVariants } from "./variants";

export type NavigationMenuIconProps = Omit<
  React.ComponentProps<typeof BaseNavigationMenu.Icon>,
  "className" | "style"
>;

/**
 * The caret rendered inside a `Trigger`; rotates while the popup is open. Maps 1:1 to
 * `NavigationMenu.Icon`.
 */
export function NavigationMenuIcon(props: NavigationMenuIconProps) {
  return <BaseNavigationMenu.Icon className={navigationMenuIconVariants()} {...props} />;
}
