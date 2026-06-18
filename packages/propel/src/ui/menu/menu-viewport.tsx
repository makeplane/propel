import { Menu as BaseMenu } from "@base-ui/react/menu";
import type * as React from "react";

export type MenuViewportProps = Omit<
  React.ComponentProps<typeof BaseMenu.Viewport>,
  "className" | "style"
>;

/**
 * A content wrapper inside the popup that morphs/clips during submenu or size transitions. Wraps
 * `Menu.Viewport` 1:1.
 */
export function MenuViewport(props: MenuViewportProps) {
  return <BaseMenu.Viewport className="relative" {...props} />;
}
