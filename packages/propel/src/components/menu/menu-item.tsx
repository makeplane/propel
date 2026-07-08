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
 * `MenuItem` and lays out a leading single-select check, an optional leading icon, the label, a
 * secondary line, and inline-end content.
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
      {/* A single-select list passes a real `selected` boolean on EVERY row; a plain action row
          passes none. Render the leading check gutter only for the former — and for every row, so
          each row's icon/label lines up whether or not it is checked (keepMounted-equivalent, like
          Select/Combobox's `ItemIndicator`). Base UI has no `Menu.ItemIndicator` to set the
          attribute, so `data-selected` is set here from the boolean; `itemIndicatorClass` hides the
          glyph via `not-data-selected:invisible` without collapsing the reserved column. */}
      {selected !== undefined ? (
        <MenuItemIndicator data-selected={selected ? "" : undefined}>
          <Check />
        </MenuItemIndicator>
      ) : null}
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
    </BaseMenu.Item>
  );
}
