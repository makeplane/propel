import { NavigationMenu as BaseNavigationMenu } from "@base-ui/react/navigation-menu";
import type * as React from "react";

export type NavigationMenuPortalProps = React.ComponentProps<typeof BaseNavigationMenu.Portal>;

/**
 * Portals the positioned popup out to the end of `document.body`. Maps 1:1 to
 * `NavigationMenu.Portal`.
 */
export function NavigationMenuPortal(props: NavigationMenuPortalProps) {
  return <BaseNavigationMenu.Portal {...props} />;
}
