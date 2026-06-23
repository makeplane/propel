import type * as React from "react";

import {
  MenuItemContent,
  MenuItemIcon,
  MenuItemTitle,
  MenuItemTitleRow,
  MenuItemTrailing,
  MenuLinkItem as MenuLinkItemRoot,
  type MenuLinkItemProps as MenuLinkItemRootProps,
} from "../../ui/menu";

export type MenuLinkItemProps = MenuLinkItemRootProps & {
  /** Leading content before the label. */
  inlineStartNode?: React.ReactNode;
  /** The primary text of the row. */
  label?: React.ReactNode;
  /** Trailing content after the label. */
  inlineEndNode?: React.ReactNode;
};

/**
 * The ready-made navigational `<a>` menu row: composes the atomic `MenuLinkItem` and lays out
 * optional leading/trailing nodes and the label.
 */
export function MenuLinkItem({
  inlineStartNode,
  label,
  inlineEndNode,
  children,
  ...props
}: MenuLinkItemProps) {
  return (
    <MenuLinkItemRoot {...props}>
      {inlineStartNode != null ? <MenuItemIcon>{inlineStartNode}</MenuItemIcon> : null}
      <MenuItemContent>
        <MenuItemTitleRow>
          <MenuItemTitle>{label ?? children}</MenuItemTitle>
        </MenuItemTitleRow>
      </MenuItemContent>
      {inlineEndNode != null ? <MenuItemTrailing>{inlineEndNode}</MenuItemTrailing> : null}
    </MenuLinkItemRoot>
  );
}
