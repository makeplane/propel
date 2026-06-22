import { NavigationMenu as BaseNavigationMenu } from "@base-ui/react/navigation-menu";

export type NavigationMenuPortalProps = BaseNavigationMenu.Portal.Props;

/**
 * Portals the positioned popup out to the end of `document.body`. Maps 1:1 to
 * `NavigationMenu.Portal`.
 */
export function NavigationMenuPortal(props: NavigationMenuPortalProps) {
  return <BaseNavigationMenu.Portal {...props} />;
}
