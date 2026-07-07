import { Menu as BaseMenu } from "@base-ui/react/menu";
import { Circle } from "lucide-react";
import type * as React from "react";

import {
  MenuItemContent,
  MenuItemControl,
  MenuItemMeta,
  MenuItemTitle,
  MenuItemTitleRow,
  type MenuItemTone,
  MenuRadioItem as MenuRadioItemElement,
  MenuRadioItemIndicator,
} from "../../elements/menu";

export type MenuRadioItemProps = Omit<
  BaseMenu.RadioItem.Props,
  "children" | "className" | "label" | "style"
> & {
  /** Neutral rows use the standard text hierarchy; `danger` rows use the error palette. */
  tone?: MenuItemTone;
  /** Leading element shown after the radio dot, e.g. `<Icon icon={Settings} tint="secondary" />`. */
  icon?: React.ReactNode;
  /** Primary row label. */
  label: React.ReactNode;
  /** Element rendered at the inline end of the row. */
  endContent?: React.ReactNode;
};

/**
 * The ready-made single-select menu row: grafts Base UI's `Menu.RadioItem` behavior onto the styled
 * `MenuRadioItem` and lays out the radio dot (a kept-mounted `Menu.RadioItemIndicator` grafted onto
 * `MenuRadioItemIndicator`), optional leading icon, label, and end content. Wrap rows in a
 * `MenuRadioGroup` carrying `value`/`onValueChange`; the dot reads the selected state from
 * context.
 */
export function MenuRadioItem({ tone, icon, label, endContent, ...props }: MenuRadioItemProps) {
  return (
    <BaseMenu.RadioItem {...props} render={<MenuRadioItemElement tone={tone} />}>
      <MenuItemControl>
        <BaseMenu.RadioItemIndicator keepMounted render={<MenuRadioItemIndicator />}>
          <Circle aria-hidden />
        </BaseMenu.RadioItemIndicator>
      </MenuItemControl>
      {icon}
      <MenuItemContent>
        <MenuItemTitleRow>
          <MenuItemTitle>{label}</MenuItemTitle>
        </MenuItemTitleRow>
      </MenuItemContent>
      {endContent != null ? <MenuItemMeta>{endContent}</MenuItemMeta> : null}
    </BaseMenu.RadioItem>
  );
}
