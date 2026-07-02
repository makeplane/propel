import { NavigationMenu as BaseNavigationMenu } from "@base-ui/react/navigation-menu";

export type NavigationMenuContentProps = Omit<
  BaseNavigationMenu.Content.Props,
  "className" | "style"
>;

/**
 * An item's content container — Base UI's unstyled `<div>` that is moved into the popup's viewport
 * while the item is active. A structural role with no propel styling, so it lives in `components`
 * as a passthrough (rules 1a, 2); put a `NavigationMenuContentList` of links inside.
 */
export function NavigationMenuContent(props: NavigationMenuContentProps) {
  return <BaseNavigationMenu.Content {...props} />;
}
