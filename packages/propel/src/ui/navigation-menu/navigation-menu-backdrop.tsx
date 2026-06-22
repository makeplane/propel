import { NavigationMenu as BaseNavigationMenu } from "@base-ui/react/navigation-menu";

import { navigationMenuBackdropVariants } from "./variants";

export type NavigationMenuBackdropProps = Omit<
  BaseNavigationMenu.Backdrop.Props,
  "className" | "style"
>;

/** The dimmed overlay rendered behind the popup. Maps 1:1 to `NavigationMenu.Backdrop`. */
export function NavigationMenuBackdrop(props: NavigationMenuBackdropProps) {
  return <BaseNavigationMenu.Backdrop className={navigationMenuBackdropVariants()} {...props} />;
}
