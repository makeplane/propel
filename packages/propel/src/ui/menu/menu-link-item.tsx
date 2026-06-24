import { Menu as BaseMenu } from "@base-ui/react/menu";

import { menuRowVariants } from "./variants";

export type MenuLinkItemProps = Omit<BaseMenu.LinkItem.Props, "className" | "style">;

/** A navigational `<a>` menu row. Wraps `Menu.LinkItem` 1:1. */
export function MenuLinkItem(props: MenuLinkItemProps) {
  return (
    <BaseMenu.LinkItem
      className={menuRowVariants({ layout: "default", emphasis: "link" })}
      {...props}
    />
  );
}
