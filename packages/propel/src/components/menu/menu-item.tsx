import { Check } from "lucide-react";
import type * as React from "react";

import {
  MenuItem as MenuItemElement,
  MenuItemContent,
  MenuItemDescription,
  MenuItemIcon,
  MenuItemSecondaryText,
  MenuItemSelectedIndicator,
  MenuItemTitle,
  MenuItemTitleRow,
  MenuItemTrailing,
  type MenuItemProps as MenuItemElementProps,
} from "../../ui/menu";

export type MenuItemProps = MenuItemElementProps & {
  /** Leading content before the label. */
  inlineStartNode?: React.ReactNode;
  /** The primary text of the row. */
  label?: React.ReactNode;
  /** Muted secondary line under the label. */
  description?: React.ReactNode;
  /** Muted text shown inline after the label. */
  secondaryText?: React.ReactNode;
  /** Trailing content after the label. */
  inlineEndNode?: React.ReactNode;
  /** Single-select selected state. */
  selected?: boolean;
};

/**
 * The ready-made selectable menu row: composes the atomic `MenuItem` and lays out optional
 * leading/trailing nodes, the label, a secondary line, and the single-select check indicator.
 */
export function MenuItem({
  inlineStartNode,
  label,
  description,
  secondaryText,
  inlineEndNode,
  selected,
  children,
  ...props
}: MenuItemProps) {
  return (
    <MenuItemElement {...props}>
      {inlineStartNode != null ? <MenuItemIcon>{inlineStartNode}</MenuItemIcon> : null}
      <MenuItemContent>
        <MenuItemTitleRow>
          <MenuItemTitle>{label ?? children}</MenuItemTitle>
          {secondaryText != null ? (
            <MenuItemSecondaryText>{secondaryText}</MenuItemSecondaryText>
          ) : null}
        </MenuItemTitleRow>
        {description != null ? <MenuItemDescription>{description}</MenuItemDescription> : null}
      </MenuItemContent>
      {inlineEndNode != null ? <MenuItemTrailing>{inlineEndNode}</MenuItemTrailing> : null}
      {selected ? (
        <MenuItemSelectedIndicator>
          <Check />
        </MenuItemSelectedIndicator>
      ) : null}
    </MenuItemElement>
  );
}
