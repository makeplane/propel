import { Menu as BaseMenu } from "@base-ui/react/menu";
import { Circle } from "lucide-react";
import type * as React from "react";

import {
  MenuItemContent,
  MenuItemControl,
  MenuItemMeta,
  MenuItemTitle,
  MenuItemTitleRow,
  MenuRadioItem as MenuRadioItemElement,
  MenuRadioItemIndicator,
} from "../../elements/menu";
import { Icon } from "../../internal/icon";

export type MenuRadioItemProps = Omit<BaseMenu.RadioItem.Props, "className" | "style"> & {
  /** Leading content shown after the radio dot. */
  icon?: React.ReactNode;
  /** Trailing content. */
  trailing?: React.ReactNode;
};

/**
 * The ready-made single-select menu row: grafts Base UI's `Menu.RadioItem` behavior onto the styled
 * `MenuRadioItem` and lays out the radio dot (a kept-mounted `Menu.RadioItemIndicator` grafted onto
 * `MenuRadioItemIndicator`), optional leading/trailing nodes, and the label. Wrap rows in a
 * `MenuRadioGroup` carrying `value`/`onValueChange`; the dot reads the selected state from
 * context.
 */
export function MenuRadioItem({ icon, trailing, children, ...props }: MenuRadioItemProps) {
  return (
    <BaseMenu.RadioItem {...props} render={<MenuRadioItemElement />}>
      <MenuItemControl>
        <BaseMenu.RadioItemIndicator keepMounted render={<MenuRadioItemIndicator />}>
          <Circle aria-hidden />
        </BaseMenu.RadioItemIndicator>
      </MenuItemControl>
      {icon != null ? <Icon tint="secondary">{icon}</Icon> : null}
      <MenuItemContent>
        <MenuItemTitleRow>
          <MenuItemTitle>{children}</MenuItemTitle>
        </MenuItemTitleRow>
      </MenuItemContent>
      {trailing != null ? <MenuItemMeta>{trailing}</MenuItemMeta> : null}
    </BaseMenu.RadioItem>
  );
}
