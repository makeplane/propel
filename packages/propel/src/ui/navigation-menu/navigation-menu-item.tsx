import { NavigationMenu as BaseNavigationMenu } from "@base-ui/react/navigation-menu";
import type * as React from "react";

export type NavigationMenuItemProps = Omit<
  React.ComponentProps<typeof BaseNavigationMenu.Item>,
  "className" | "style"
>;

/**
 * A single item in the list, grouping a `Trigger`/`Link` with its `Content`. Structural, so it
 * carries no chrome. Maps 1:1 to `NavigationMenu.Item`.
 */
export function NavigationMenuItem(props: NavigationMenuItemProps) {
  return <BaseNavigationMenu.Item {...props} />;
}
