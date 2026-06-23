import type * as React from "react";

import {
  MenuItemContent,
  MenuItemIcon,
  MenuItemSubmenuIndicator,
  MenuItemTitle,
  MenuItemTitleRow,
  MenuItemTrailing,
  MenuSubTrigger as MenuSubTriggerRoot,
  type MenuSubTriggerProps as MenuSubTriggerRootProps,
} from "../../ui/menu";

export type MenuSubTriggerProps = MenuSubTriggerRootProps & {
  /** Leading content before the label. */
  inlineStartNode?: React.ReactNode;
  /** The primary text of the row. */
  label?: React.ReactNode;
  /** Trailing content before the chevron. */
  inlineEndNode?: React.ReactNode;
};

/**
 * The ready-made submenu trigger row: composes the atomic `MenuSubTrigger` and lays out optional
 * leading/trailing nodes, the label, and the submenu chevron indicator.
 */
export function MenuSubTrigger({
  inlineStartNode,
  label,
  inlineEndNode,
  children,
  ...props
}: MenuSubTriggerProps) {
  return (
    <MenuSubTriggerRoot {...props}>
      {inlineStartNode != null ? <MenuItemIcon>{inlineStartNode}</MenuItemIcon> : null}
      <MenuItemContent>
        <MenuItemTitleRow>
          <MenuItemTitle>{label ?? children}</MenuItemTitle>
        </MenuItemTitleRow>
      </MenuItemContent>
      {inlineEndNode != null ? <MenuItemTrailing>{inlineEndNode}</MenuItemTrailing> : null}
      <MenuItemSubmenuIndicator />
    </MenuSubTriggerRoot>
  );
}
