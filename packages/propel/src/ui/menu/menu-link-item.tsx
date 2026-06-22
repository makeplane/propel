import { Menu as BaseMenu } from "@base-ui/react/menu";

import { menuItemVariants } from "./variants";

export type MenuLinkItemProps = Omit<BaseMenu.LinkItem.Props, "className" | "style" | "label">;

/** A navigational `<a>` menu row. Wraps `Menu.LinkItem` 1:1. */
export function MenuLinkItem(props: MenuLinkItemProps) {
  return <BaseMenu.LinkItem className={menuItemVariants()} {...props} />;
}
