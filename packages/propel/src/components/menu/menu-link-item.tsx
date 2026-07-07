import { Menu as BaseMenu } from "@base-ui/react/menu";
import type * as React from "react";

import {
  MenuItemContent,
  MenuItemTitle,
  MenuItemTitleRow,
  MenuItemTrailing,
  MenuLinkItem as MenuLinkItemElement,
  type MenuItemTone,
} from "../../elements/menu";

export type MenuLinkItemProps = Omit<
  BaseMenu.LinkItem.Props,
  "children" | "className" | "label" | "style"
> & {
  /** Neutral rows use the standard text hierarchy; `danger` rows use the error palette. */
  tone?: MenuItemTone;
  /** Leading element before the label, e.g. `<Icon icon={ExternalLink} tint="secondary" />`. */
  icon?: React.ReactNode;
  /** Primary row label. */
  label: React.ReactNode;
  /** Element rendered at the inline end of the row. */
  endContent?: React.ReactNode;
};

/**
 * The ready-made navigational `<a>` menu row: grafts Base UI's `Menu.LinkItem` behavior onto the
 * styled `MenuLinkItem` and lays out an optional leading icon, label, and end content.
 */
export function MenuLinkItem({ tone, icon, label, endContent, ...props }: MenuLinkItemProps) {
  return (
    <BaseMenu.LinkItem {...props} render={<MenuLinkItemElement tone={tone} />}>
      {icon}
      <MenuItemContent>
        <MenuItemTitleRow>
          <MenuItemTitle>{label}</MenuItemTitle>
        </MenuItemTitleRow>
      </MenuItemContent>
      {endContent != null ? <MenuItemTrailing>{endContent}</MenuItemTrailing> : null}
    </BaseMenu.LinkItem>
  );
}
