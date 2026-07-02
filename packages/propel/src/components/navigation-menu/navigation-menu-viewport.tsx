import { NavigationMenu as BaseNavigationMenu } from "@base-ui/react/navigation-menu";

import { NavigationMenuViewport as NavigationMenuViewportElement } from "../../elements/navigation-menu";

export type NavigationMenuViewportProps = Omit<
  BaseNavigationMenu.Viewport.Props,
  "className" | "style"
>;

/**
 * The ready-made morph container: grafts Base UI's `NavigationMenu.Viewport` behavior onto the
 * styled viewport, which resizes between items' content via Base UI's
 * `--popup-width`/`--popup-height`. Nest it inside `NavigationMenuPanel`.
 */
export function NavigationMenuViewport(props: NavigationMenuViewportProps) {
  return <BaseNavigationMenu.Viewport {...props} render={<NavigationMenuViewportElement />} />;
}
