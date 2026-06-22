import { NavigationMenu as BaseNavigationMenu } from "@base-ui/react/navigation-menu";

import { navigationMenuPopupVariants } from "./variants";

export type NavigationMenuPopupProps = Omit<BaseNavigationMenu.Popup.Props, "className" | "style">;

/**
 * The shared anchored surface that houses the active item's `Content`. Maps 1:1 to
 * `NavigationMenu.Popup`.
 */
export function NavigationMenuPopup(props: NavigationMenuPopupProps) {
  return <BaseNavigationMenu.Popup className={navigationMenuPopupVariants()} {...props} />;
}
