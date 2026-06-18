import { NavigationMenu as BaseNavigationMenu } from "@base-ui/react/navigation-menu";
import type * as React from "react";

import { navigationMenuPopupVariants } from "./variants";

export type NavigationMenuPopupProps = Omit<
  React.ComponentProps<typeof BaseNavigationMenu.Popup>,
  "className" | "style"
>;

/**
 * The shared anchored surface that houses the active item's `Content`. Maps 1:1 to
 * `NavigationMenu.Popup`.
 */
export function NavigationMenuPopup(props: NavigationMenuPopupProps) {
  return <BaseNavigationMenu.Popup className={navigationMenuPopupVariants()} {...props} />;
}
