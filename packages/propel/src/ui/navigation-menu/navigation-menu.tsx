import { NavigationMenu as BaseNavigationMenu } from "@base-ui/react/navigation-menu";

export type NavigationMenuProps = Omit<BaseNavigationMenu.Root.Props, "className" | "style">;

/**
 * The root of a navigation menu — a collection of links and menus for site navigation. Maps 1:1 to
 * Base UI's `NavigationMenu.Root`.
 */
export function NavigationMenu(props: NavigationMenuProps) {
  return <BaseNavigationMenu.Root {...props} />;
}
