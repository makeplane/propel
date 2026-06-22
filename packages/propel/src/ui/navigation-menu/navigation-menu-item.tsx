import { NavigationMenu as BaseNavigationMenu } from "@base-ui/react/navigation-menu";

export type NavigationMenuItemProps = Omit<BaseNavigationMenu.Item.Props, "className" | "style">;

/**
 * A single item in the list, grouping a `Trigger`/`Link` with its `Content`. Structural, so it
 * carries no chrome. Maps 1:1 to `NavigationMenu.Item`.
 */
export function NavigationMenuItem(props: NavigationMenuItemProps) {
  return <BaseNavigationMenu.Item {...props} />;
}
