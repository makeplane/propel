import { NavigationMenu as BaseNavigationMenu } from "@base-ui/react/navigation-menu";

import { navigationMenuViewportVariants } from "./variants";

export type NavigationMenuViewportProps = Omit<
  BaseNavigationMenu.Viewport.Props,
  "className" | "style"
>;

/**
 * The morph container that resizes between items' `Content`, reading Base UI's `--popup-width`/
 * `--popup-height`. Maps 1:1 to `NavigationMenu.Viewport`.
 */
export function NavigationMenuViewport(props: NavigationMenuViewportProps) {
  return <BaseNavigationMenu.Viewport className={navigationMenuViewportVariants()} {...props} />;
}
