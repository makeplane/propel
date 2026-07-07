import { Menu as BaseMenu } from "@base-ui/react/menu";
import { Check } from "lucide-react";
import type * as React from "react";

import {
  MenuCheckboxItem as MenuCheckboxItemElement,
  MenuCheckboxItemIndicator,
  MenuItemContent,
  MenuItemControl,
  MenuItemEndContent,
  MenuItemTitle,
  MenuItemTitleRow,
  type MenuItemTone,
} from "../../elements/menu";

export type MenuCheckboxItemProps = Omit<
  BaseMenu.CheckboxItem.Props,
  "children" | "className" | "label" | "style"
> & {
  /** Row text palette. */
  tone?: MenuItemTone;
  /** Leading element shown after the checkbox, e.g. `<Icon icon={Settings} tint="secondary" />`. */
  icon?: React.ReactNode;
  /** Primary row label. */
  label: string;
  /** Element rendered at the inline end of the row, e.g. `<Shortcut keys="⌘ K" />`. */
  endContent?: React.ReactElement;
};

/**
 * The ready-made toggleable multi-select menu row: grafts Base UI's `Menu.CheckboxItem` behavior
 * onto the styled `MenuCheckboxItem` and lays out the checkbox box (a kept-mounted
 * `Menu.CheckboxItemIndicator` grafted onto `MenuCheckboxItemIndicator` + a lucide `Check`),
 * optional leading icon, label, and end content. Base UI's `Menu.CheckboxItem` tracks the checked
 * state, so `checked` / `defaultChecked` / `onCheckedChange` forward straight to it and the
 * indicator reads it from context.
 */
export function MenuCheckboxItem({
  tone,
  icon,
  label,
  endContent,
  ...props
}: MenuCheckboxItemProps) {
  return (
    <BaseMenu.CheckboxItem {...props} render={<MenuCheckboxItemElement tone={tone} />}>
      <MenuItemControl>
        <BaseMenu.CheckboxItemIndicator keepMounted render={<MenuCheckboxItemIndicator />}>
          <Check aria-hidden />
        </BaseMenu.CheckboxItemIndicator>
      </MenuItemControl>
      {icon}
      <MenuItemContent>
        <MenuItemTitleRow>
          <MenuItemTitle>{label}</MenuItemTitle>
        </MenuItemTitleRow>
      </MenuItemContent>
      {endContent != null ? <MenuItemEndContent>{endContent}</MenuItemEndContent> : null}
    </BaseMenu.CheckboxItem>
  );
}
