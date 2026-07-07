import { Menu as BaseMenu } from "@base-ui/react/menu";
import { ChevronDown } from "lucide-react";
import type * as React from "react";

import {
  MenuItemContent,
  MenuItemTitle,
  MenuItemTitleRow,
  MenuItemEndContent,
  type MenuItemTone,
  MenuSubmenuTrigger as MenuSubmenuTriggerElement,
} from "../../elements/menu";
import { DisclosureIndicator } from "../../internal/disclosure-indicator";

export type MenuSubmenuTriggerProps = Omit<
  BaseMenu.SubmenuTrigger.Props,
  "children" | "className" | "label" | "style"
> & {
  /** Row text palette. */
  tone?: MenuItemTone;
  /** Leading element before the label, e.g. `<Icon icon={Folder} tint="secondary" />`. */
  icon?: React.ReactNode;
  /** Primary row label. */
  label: string;
  /** Element rendered before the submenu chevron, e.g. `<Shortcut keys="⌘ K" />`. */
  endContent?: React.ReactElement;
};

/**
 * The ready-made submenu trigger row: grafts Base UI's `Menu.SubmenuTrigger` behavior onto the
 * styled `MenuSubmenuTrigger` and lays out an optional leading icon, label, end content, and the
 * submenu chevron indicator.
 */
export function MenuSubmenuTrigger({
  tone,
  icon,
  endContent,
  label,
  ...props
}: MenuSubmenuTriggerProps) {
  return (
    <BaseMenu.SubmenuTrigger {...props} render={<MenuSubmenuTriggerElement tone={tone} />}>
      {icon}
      <MenuItemContent>
        <MenuItemTitleRow>
          <MenuItemTitle>{label}</MenuItemTitle>
        </MenuItemTitleRow>
      </MenuItemContent>
      {endContent != null ? <MenuItemEndContent>{endContent}</MenuItemEndContent> : null}
      <DisclosureIndicator motion="pointEnd" tint="tertiary" magnitude="inherit">
        <ChevronDown />
      </DisclosureIndicator>
    </BaseMenu.SubmenuTrigger>
  );
}
