import { NavigationMenu as BaseNavigationMenu } from "@base-ui/react/navigation-menu";
import type * as React from "react";

export type NavigationMenuProps = Omit<
  React.ComponentProps<typeof BaseNavigationMenu.Root>,
  "className" | "style"
>;

/**
 * The root of a navigation menu — a collection of links and dropdown menus for site navigation.
 * Maps 1:1 to Base UI's `NavigationMenu.Root`.
 */
export function NavigationMenu(props: NavigationMenuProps) {
  return <BaseNavigationMenu.Root {...props} />;
}
