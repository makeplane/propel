import { NavigationMenu as BaseNavigationMenu } from "@base-ui/react/navigation-menu";

import { navigationMenuListVariants } from "./variants";

export type NavigationMenuListProps = Omit<BaseNavigationMenu.List.Props, "className" | "style">;

/** The horizontal row of top-level menu items. Maps 1:1 to `NavigationMenu.List`. */
export function NavigationMenuList(props: NavigationMenuListProps) {
  return <BaseNavigationMenu.List className={navigationMenuListVariants()} {...props} />;
}
