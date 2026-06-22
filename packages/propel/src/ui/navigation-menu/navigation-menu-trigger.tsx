import { NavigationMenu as BaseNavigationMenu } from "@base-ui/react/navigation-menu";

import { navigationMenuTriggerVariants } from "./variants";

export type NavigationMenuTriggerProps = Omit<
  BaseNavigationMenu.Trigger.Props,
  "className" | "style"
>;

/**
 * The button that opens an item's `Content`. Base UI reflects open state as `[data-popup-open]`.
 * Maps 1:1 to `NavigationMenu.Trigger`.
 */
export function NavigationMenuTrigger(props: NavigationMenuTriggerProps) {
  return <BaseNavigationMenu.Trigger className={navigationMenuTriggerVariants()} {...props} />;
}
