import { NavigationMenu as BaseNavigationMenu } from "@base-ui/react/navigation-menu";
import type { VariantProps } from "class-variance-authority";

import { navigationMenuLinkVariants } from "./variants";

export type NavigationMenuLinkProps = Omit<BaseNavigationMenu.Link.Props, "className" | "style"> &
  Required<VariantProps<typeof navigationMenuLinkVariants>>;

/**
 * A navigable link. `variant="item"` is a top-level pill that shares the nav-item chrome with
 * `Trigger`; `variant="card"` is a stacked entry inside `Content`, pairing a
 * `NavigationMenuLinkTitle` with an optional `NavigationMenuLinkDescription`. Maps 1:1 to
 * `NavigationMenu.Link`.
 */
export function NavigationMenuLink({ variant, ...props }: NavigationMenuLinkProps) {
  return <BaseNavigationMenu.Link className={navigationMenuLinkVariants({ variant })} {...props} />;
}
