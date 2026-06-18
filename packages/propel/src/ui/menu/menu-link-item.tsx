import { Menu as BaseMenu } from "@base-ui/react/menu";
import type * as React from "react";

import { menuItemVariants } from "./variants";

export type MenuLinkItemProps = Omit<
  React.ComponentProps<typeof BaseMenu.LinkItem>,
  "className" | "style" | "label"
>;

/** A navigational `<a>` menu row. Wraps `Menu.LinkItem` 1:1. */
export function MenuLinkItem({ children, ...props }: MenuLinkItemProps) {
  return (
    <BaseMenu.LinkItem className={menuItemVariants()} {...props}>
      {children}
    </BaseMenu.LinkItem>
  );
}
