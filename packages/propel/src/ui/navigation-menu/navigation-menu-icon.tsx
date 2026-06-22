import { NavigationMenu as BaseNavigationMenu } from "@base-ui/react/navigation-menu";

import { navigationMenuIconVariants } from "./variants";

export type NavigationMenuIconProps = Omit<BaseNavigationMenu.Icon.Props, "className" | "style">;

/**
 * The caret rendered inside a `Trigger`; rotates while the popup is open. Maps 1:1 to
 * `NavigationMenu.Icon`.
 */
export function NavigationMenuIcon(props: NavigationMenuIconProps) {
  return <BaseNavigationMenu.Icon className={navigationMenuIconVariants()} {...props} />;
}
