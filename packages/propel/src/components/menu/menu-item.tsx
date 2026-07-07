import { Menu as BaseMenu } from "@base-ui/react/menu";
import { Check } from "lucide-react";
import type * as React from "react";

import {
  MenuItem as MenuItemElement,
  type MenuItemTone,
  MenuItemContent,
  MenuItemDescription,
  MenuItemSecondaryText,
  MenuItemIndicator,
  MenuItemTitle,
  MenuItemTitleRow,
  MenuItemEndContent,
} from "../../elements/menu";

export type MenuItemProps = Omit<
  BaseMenu.Item.Props,
  "children" | "className" | "label" | "style"
> & {
  /** Row text palette. */
  tone?: MenuItemTone;
  /** Leading element before the label, e.g. `<Icon icon={Settings} tint="secondary" />`. */
  icon?: React.ReactNode;
  /** Primary row label. */
  label: string;
  /** Muted secondary line under the label. */
  description?: string;
  /** Muted text shown inline after the label. */
  secondaryText?: string;
  /** Element rendered at the inline end of the row, e.g. `<Shortcut keys="⌘ K" />`. */
  endContent?: React.ReactElement;
  /** Single-select selected state. */
  selected?: boolean;
};

/**
 * The ready-made selectable menu row: grafts Base UI's `Menu.Item` behavior onto the styled
 * `MenuItem` and lays out an optional leading icon, label, secondary line, and inline-end content,
 * plus the single-select check indicator.
 */
export function MenuItem({
  tone,
  icon,
  description,
  secondaryText,
  endContent,
  selected,
  label,
  ...props
}: MenuItemProps) {
  // The taller, top-aligned row layout is implied by having a description — derived, not a prop.
  const layout = description != null ? "with-description" : "default";
  return (
    <BaseMenu.Item {...props} render={<MenuItemElement layout={layout} tone={tone} />}>
      {icon}
      <MenuItemContent>
        <MenuItemTitleRow>
          <MenuItemTitle>{label}</MenuItemTitle>
          {secondaryText != null ? (
            <MenuItemSecondaryText>{secondaryText}</MenuItemSecondaryText>
          ) : null}
        </MenuItemTitleRow>
        {description != null ? <MenuItemDescription>{description}</MenuItemDescription> : null}
      </MenuItemContent>
      {endContent != null ? <MenuItemEndContent>{endContent}</MenuItemEndContent> : null}
      {selected ? (
        <MenuItemIndicator>
          <Check />
        </MenuItemIndicator>
      ) : null}
    </BaseMenu.Item>
  );
}
