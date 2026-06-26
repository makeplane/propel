import type * as React from "react";

import { CheckboxGlyph } from "../../ui/checkbox/index";
import {
  MenuCheckboxItem as MenuCheckboxItemElement,
  type MenuCheckboxItemProps as MenuCheckboxItemElementProps,
  MenuCheckboxItemIndicator,
  MenuItemContent,
  MenuItemControl,
  MenuItemIcon,
  MenuItemMeta,
  MenuItemTitle,
  MenuItemTitleRow,
} from "../../ui/menu";

export type MenuCheckboxItemProps = MenuCheckboxItemElementProps & {
  /** Leading content shown after the checkbox. */
  inlineStartNode?: React.ReactNode;
  /** Trailing content. */
  inlineEndNode?: React.ReactNode;
};

/**
 * The ready-made toggleable multi-select menu row: composes the atomic `MenuCheckboxItem` and lays
 * out the checkbox box (`MenuCheckboxItemIndicator` + `CheckboxGlyph`), optional leading/trailing
 * nodes, and the label. Base UI's `MenuCheckboxItem` tracks the checked state, so `checked` /
 * `defaultChecked` / `onCheckedChange` forward straight to it and the indicator reads it from
 * context.
 */
export function MenuCheckboxItem({
  inlineStartNode,
  inlineEndNode,
  children,
  ...props
}: MenuCheckboxItemProps) {
  return (
    <MenuCheckboxItemElement {...props}>
      <MenuItemControl>
        <MenuCheckboxItemIndicator>
          <CheckboxGlyph />
        </MenuCheckboxItemIndicator>
      </MenuItemControl>
      {inlineStartNode != null ? <MenuItemIcon>{inlineStartNode}</MenuItemIcon> : null}
      <MenuItemContent>
        <MenuItemTitleRow>
          <MenuItemTitle>{children}</MenuItemTitle>
        </MenuItemTitleRow>
      </MenuItemContent>
      {inlineEndNode != null ? <MenuItemMeta>{inlineEndNode}</MenuItemMeta> : null}
    </MenuCheckboxItemElement>
  );
}
