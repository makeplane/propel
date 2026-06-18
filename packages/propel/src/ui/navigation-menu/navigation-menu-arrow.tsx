import { NavigationMenu as BaseNavigationMenu } from "@base-ui/react/navigation-menu";
import type * as React from "react";

export type NavigationMenuArrowProps = Omit<
  React.ComponentProps<typeof BaseNavigationMenu.Arrow>,
  "className" | "style"
>;

/**
 * The optional caret pointing from the popup back to the active trigger. Maps 1:1 to
 * `NavigationMenu.Arrow`.
 */
export function NavigationMenuArrow(props: NavigationMenuArrowProps) {
  return <BaseNavigationMenu.Arrow {...props} />;
}
