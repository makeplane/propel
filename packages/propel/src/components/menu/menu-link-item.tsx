import { Menu as BaseMenu } from "@base-ui/react/menu";
import type * as React from "react";

import {
  MenuItemContent,
  MenuItemTitle,
  MenuItemTitleRow,
  MenuItemEndContent,
  MenuLinkItem as MenuLinkItemElement,
  type MenuItemTone,
} from "../../elements/menu";

export type MenuLinkItemProps = Omit<
  BaseMenu.LinkItem.Props,
  "children" | "className" | "label" | "style"
> & {
  /** Row text palette. */
  tone?: MenuItemTone;
  /** Leading element before the label, e.g. `<Icon icon={ExternalLink} tint="secondary" />`. */
  icon?: React.ReactNode;
  /** Primary row label. */
  label: string;
  /** Element rendered at the inline end of the row, e.g. `<Shortcut keys="⌘ K" />`. */
  endContent?: React.ReactElement;
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
      {endContent != null ? <MenuItemEndContent>{endContent}</MenuItemEndContent> : null}
    </BaseMenu.LinkItem>
  );
}
