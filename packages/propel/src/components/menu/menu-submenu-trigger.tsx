import { Menu as BaseMenu } from "@base-ui/react/menu";
import { ChevronRight } from "lucide-react";
import type * as React from "react";

import {
  MenuItemContent,
  MenuItemIcon,
  MenuItemSubmenuIndicator,
  MenuItemTitle,
  MenuItemTitleRow,
  MenuItemTrailing,
  MenuSubmenuTrigger as MenuSubmenuTriggerElement,
} from "../../elements/menu";

export type MenuSubmenuTriggerProps = Omit<
  BaseMenu.SubmenuTrigger.Props,
  "className" | "style" | "label"
> & {
  /** Leading content before the label. */
  inlineStartNode?: React.ReactNode;
  /** Trailing content before the chevron. */
  inlineEndNode?: React.ReactNode;
};

/**
 * The ready-made submenu trigger row: grafts Base UI's `Menu.SubmenuTrigger` behavior onto the
 * styled `MenuSubmenuTrigger` and lays out optional leading/trailing nodes, the label, and the
 * submenu chevron indicator.
 */
export function MenuSubmenuTrigger({
  inlineStartNode,
  inlineEndNode,
  children,
  ...props
}: MenuSubmenuTriggerProps) {
  return (
    <BaseMenu.SubmenuTrigger {...props} render={<MenuSubmenuTriggerElement />}>
      {inlineStartNode != null ? <MenuItemIcon>{inlineStartNode}</MenuItemIcon> : null}
      <MenuItemContent>
        <MenuItemTitleRow>
          <MenuItemTitle>{children}</MenuItemTitle>
        </MenuItemTitleRow>
      </MenuItemContent>
      {inlineEndNode != null ? <MenuItemTrailing>{inlineEndNode}</MenuItemTrailing> : null}
      <MenuItemSubmenuIndicator>
        <ChevronRight />
      </MenuItemSubmenuIndicator>
    </BaseMenu.SubmenuTrigger>
  );
}
