import { Menu as BaseMenu } from "@base-ui/react/menu";
import type * as React from "react";

import {
  MenuItemContent,
  MenuItemTitle,
  MenuItemTitleRow,
  MenuItemTrailing,
  MenuLinkItem as MenuLinkItemElement,
} from "../../elements/menu";
import { Icon } from "../../internal/icon";

export type MenuLinkItemProps = Omit<BaseMenu.LinkItem.Props, "className" | "style"> & {
  /** Leading content before the label. */
  icon?: React.ReactNode;
  /** Trailing content after the label. */
  trailing?: React.ReactNode;
};

/**
 * The ready-made navigational `<a>` menu row: grafts Base UI's `Menu.LinkItem` behavior onto the
 * styled `MenuLinkItem` and lays out optional leading/trailing nodes and the label.
 */
export function MenuLinkItem({ icon, trailing, children, ...props }: MenuLinkItemProps) {
  return (
    <BaseMenu.LinkItem {...props} render={<MenuLinkItemElement />}>
      {icon != null ? <Icon tint="secondary">{icon}</Icon> : null}
      <MenuItemContent>
        <MenuItemTitleRow>
          <MenuItemTitle>{children}</MenuItemTitle>
        </MenuItemTitleRow>
      </MenuItemContent>
      {trailing != null ? <MenuItemTrailing>{trailing}</MenuItemTrailing> : null}
    </BaseMenu.LinkItem>
  );
}
