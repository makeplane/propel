import { Menu as BaseMenu } from "@base-ui/react/menu";
import type * as React from "react";

import {
  MenuItemContent,
  MenuItemIcon,
  MenuItemTitle,
  MenuItemTitleRow,
  MenuItemTrailing,
  MenuLinkItem as MenuLinkItemElement,
} from "../../elements/menu";

export type MenuLinkItemProps = Omit<BaseMenu.LinkItem.Props, "className" | "style"> & {
  /** Leading content before the label. */
  inlineStartNode?: React.ReactNode;
  /** Trailing content after the label. */
  inlineEndNode?: React.ReactNode;
};

/**
 * The ready-made navigational `<a>` menu row: grafts Base UI's `Menu.LinkItem` behavior onto the
 * styled `MenuLinkItem` and lays out optional leading/trailing nodes and the label.
 */
export function MenuLinkItem({
  inlineStartNode,
  inlineEndNode,
  children,
  ...props
}: MenuLinkItemProps) {
  return (
    <BaseMenu.LinkItem {...props} render={<MenuLinkItemElement />}>
      {inlineStartNode != null ? <MenuItemIcon>{inlineStartNode}</MenuItemIcon> : null}
      <MenuItemContent>
        <MenuItemTitleRow>
          <MenuItemTitle>{children}</MenuItemTitle>
        </MenuItemTitleRow>
      </MenuItemContent>
      {inlineEndNode != null ? <MenuItemTrailing>{inlineEndNode}</MenuItemTrailing> : null}
    </BaseMenu.LinkItem>
  );
}
