import { NavigationMenu as BaseNavigationMenu } from "@base-ui/react/navigation-menu";

import { navigationMenuPositionerVariants } from "./variants";

export type NavigationMenuPositionerProps = Omit<
  BaseNavigationMenu.Positioner.Props,
  "className" | "style"
>;

/**
 * Anchors the popup to the active trigger via the underlying positioning engine. Maps 1:1 to
 * `NavigationMenu.Positioner`.
 */
export function NavigationMenuPositioner(props: NavigationMenuPositionerProps) {
  return (
    <BaseNavigationMenu.Positioner className={navigationMenuPositionerVariants()} {...props} />
  );
}
