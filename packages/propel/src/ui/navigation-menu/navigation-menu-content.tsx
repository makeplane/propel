import { NavigationMenu as BaseNavigationMenu } from "@base-ui/react/navigation-menu";
import type * as React from "react";

export type NavigationMenuContentProps = Omit<
  React.ComponentProps<typeof BaseNavigationMenu.Content>,
  "className" | "style"
>;

/**
 * The panel shown when an item is active; rendered into the shared `Viewport`. Structural — its own
 * links own their layout. Maps 1:1 to `NavigationMenu.Content`.
 */
export function NavigationMenuContent(props: NavigationMenuContentProps) {
  return <BaseNavigationMenu.Content {...props} />;
}
