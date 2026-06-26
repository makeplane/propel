import { NavigationMenu as BaseNavigationMenu } from "@base-ui/react/navigation-menu";

import { type NavigationMenuLinkVariantProps, navigationMenuLinkVariants } from "./variants";

export type NavigationMenuLinkProps = Omit<BaseNavigationMenu.Link.Props, "className" | "style"> &
  NavigationMenuLinkVariantProps;

/**
 * A navigable link. `presentation="item"` is a top-level pill that shares the nav-item chrome with
 * `Trigger`; `presentation="card"` is a stacked entry inside `Content`, pairing a
 * `NavigationMenuLinkTitle` with an optional `NavigationMenuLinkDescription`. Maps 1:1 to
 * `NavigationMenu.Link`.
 */
export function NavigationMenuLink({ presentation, ...props }: NavigationMenuLinkProps) {
  return (
    <BaseNavigationMenu.Link className={navigationMenuLinkVariants({ presentation })} {...props} />
  );
}
