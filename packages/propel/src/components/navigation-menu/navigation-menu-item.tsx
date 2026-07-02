import { NavigationMenu as BaseNavigationMenu } from "@base-ui/react/navigation-menu";

export type NavigationMenuItemProps = Omit<BaseNavigationMenu.Item.Props, "className" | "style">;

/**
 * An individual navigation menu item — Base UI's unstyled `<li>` that scopes a
 * `NavigationMenuTrigger` to its `NavigationMenuContent`. A structural role with no propel styling,
 * so it lives in `components` as a passthrough (rules 1a, 2).
 */
export function NavigationMenuItem(props: NavigationMenuItemProps) {
  return <BaseNavigationMenu.Item {...props} />;
}
