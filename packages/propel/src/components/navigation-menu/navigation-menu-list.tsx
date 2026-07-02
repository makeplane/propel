import { NavigationMenu as BaseNavigationMenu } from "@base-ui/react/navigation-menu";

import { NavigationMenuList as NavigationMenuListElement } from "../../elements/navigation-menu";

export type NavigationMenuListProps = Omit<BaseNavigationMenu.List.Props, "className" | "style">;

/**
 * The ready-made top-level row: grafts Base UI's `NavigationMenu.List` behavior (roving focus,
 * open-state tracking) onto the styled `elements` list. Holds `NavigationMenuItem` children.
 */
export function NavigationMenuList(props: NavigationMenuListProps) {
  return <BaseNavigationMenu.List {...props} render={<NavigationMenuListElement />} />;
}
