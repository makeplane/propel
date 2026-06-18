import { NavigationMenu as BaseNavigationMenu } from "@base-ui/react/navigation-menu";
import type * as React from "react";

import { navigationMenuBackdropVariants } from "./variants";

export type NavigationMenuBackdropProps = Omit<
  React.ComponentProps<typeof BaseNavigationMenu.Backdrop>,
  "className" | "style"
>;

/** The dimmed overlay rendered behind the popup. Maps 1:1 to `NavigationMenu.Backdrop`. */
export function NavigationMenuBackdrop(props: NavigationMenuBackdropProps) {
  return <BaseNavigationMenu.Backdrop className={navigationMenuBackdropVariants()} {...props} />;
}
