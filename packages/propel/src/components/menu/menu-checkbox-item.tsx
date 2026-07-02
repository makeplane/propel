import { Menu as BaseMenu } from "@base-ui/react/menu";
import { Check } from "lucide-react";
import type * as React from "react";

import {
  MenuCheckboxItem as MenuCheckboxItemElement,
  MenuCheckboxItemIndicator,
  MenuItemContent,
  MenuItemControl,
  MenuItemIcon,
  MenuItemMeta,
  MenuItemTitle,
  MenuItemTitleRow,
} from "../../elements/menu";

export type MenuCheckboxItemProps = Omit<
  BaseMenu.CheckboxItem.Props,
  "className" | "style" | "label"
> & {
  /** Leading content shown after the checkbox. */
  inlineStartNode?: React.ReactNode;
  /** Trailing content. */
  inlineEndNode?: React.ReactNode;
};

/**
 * The ready-made toggleable multi-select menu row: grafts Base UI's `Menu.CheckboxItem` behavior
 * onto the styled `MenuCheckboxItem` and lays out the checkbox box (a kept-mounted
 * `Menu.CheckboxItemIndicator` grafted onto `MenuCheckboxItemIndicator` + a lucide `Check`),
 * optional leading/trailing nodes, and the label. Base UI's `Menu.CheckboxItem` tracks the checked
 * state, so `checked` / `defaultChecked` / `onCheckedChange` forward straight to it and the
 * indicator reads it from context.
 */
export function MenuCheckboxItem({
  inlineStartNode,
  inlineEndNode,
  children,
  ...props
}: MenuCheckboxItemProps) {
  return (
    <BaseMenu.CheckboxItem {...props} render={<MenuCheckboxItemElement />}>
      <MenuItemControl>
        <BaseMenu.CheckboxItemIndicator keepMounted render={<MenuCheckboxItemIndicator />}>
          <Check aria-hidden />
        </BaseMenu.CheckboxItemIndicator>
      </MenuItemControl>
      {inlineStartNode != null ? <MenuItemIcon>{inlineStartNode}</MenuItemIcon> : null}
      <MenuItemContent>
        <MenuItemTitleRow>
          <MenuItemTitle>{children}</MenuItemTitle>
        </MenuItemTitleRow>
      </MenuItemContent>
      {inlineEndNode != null ? <MenuItemMeta>{inlineEndNode}</MenuItemMeta> : null}
    </BaseMenu.CheckboxItem>
  );
}
