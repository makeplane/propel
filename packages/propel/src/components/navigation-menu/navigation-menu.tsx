import { NavigationMenu as BaseNavigationMenu } from "@base-ui/react/navigation-menu";

export type NavigationMenuProps = Omit<BaseNavigationMenu.Root.Props, "className" | "style">;

/**
 * The navigation menu Root — Base UI's context/state provider. It renders Base UI's unstyled
 * `<nav>` container (a `<div>` when nested) and carries no propel styling, so it is a behavior-only
 * role and lives in `components` (rules 1a, 2); the styled parts live in `elements/navigation-menu`
 * and are grafted onto Base UI behavior here.
 */
export function NavigationMenu(props: NavigationMenuProps) {
  return <BaseNavigationMenu.Root {...props} />;
}
