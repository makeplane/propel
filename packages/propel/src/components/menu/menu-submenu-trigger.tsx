import { ChevronRight } from "lucide-react";
import type * as React from "react";

import {
  MenuItemContent,
  MenuItemIcon,
  MenuItemSubmenuIndicator,
  MenuItemTitle,
  MenuItemTitleRow,
  MenuItemTrailing,
  MenuSubmenuTrigger as MenuSubmenuTriggerRoot,
  type MenuSubmenuTriggerProps as MenuSubmenuTriggerRootProps,
} from "../../ui/menu";

export type MenuSubmenuTriggerProps = MenuSubmenuTriggerRootProps & {
  /** Leading content before the label. */
  inlineStartNode?: React.ReactNode;
  /** The primary text of the row. */
  label?: React.ReactNode;
  /** Trailing content before the chevron. */
  inlineEndNode?: React.ReactNode;
};

/**
 * The ready-made submenu trigger row: composes the atomic `MenuSubmenuTrigger` and lays out
 * optional leading/trailing nodes, the label, and the submenu chevron indicator.
 */
export function MenuSubmenuTrigger({
  inlineStartNode,
  label,
  inlineEndNode,
  children,
  ...props
}: MenuSubmenuTriggerProps) {
  return (
    <MenuSubmenuTriggerRoot {...props}>
      {inlineStartNode != null ? <MenuItemIcon>{inlineStartNode}</MenuItemIcon> : null}
      <MenuItemContent>
        <MenuItemTitleRow>
          <MenuItemTitle>{label ?? children}</MenuItemTitle>
        </MenuItemTitleRow>
      </MenuItemContent>
      {inlineEndNode != null ? <MenuItemTrailing>{inlineEndNode}</MenuItemTrailing> : null}
      <MenuItemSubmenuIndicator>
        <ChevronRight />
      </MenuItemSubmenuIndicator>
    </MenuSubmenuTriggerRoot>
  );
}
