import { Menu as BaseMenu } from "@base-ui/react/menu";
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
} from "../../elements/menu";

export type MenuItemProps = Omit<BaseMenu.Item.Props, "className" | "style"> & {
  /** Leading content before the label. */
  inlineStartNode?: React.ReactNode;
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
 * The ready-made selectable menu row: grafts Base UI's `Menu.Item` behavior onto the styled
 * `MenuItem` and lays out optional leading/trailing nodes, the label, a secondary line, and the
 * single-select check indicator.
 */
export function MenuItem({
  inlineStartNode,
  description,
  secondaryText,
  inlineEndNode,
  selected,
  children,
  ...props
}: MenuItemProps) {
  // The taller, top-aligned row layout is implied by having a description — derived, not a prop.
  const layout = description != null ? "with-description" : "default";
  return (
    <BaseMenu.Item {...props} render={<MenuItemElement layout={layout} />}>
      {inlineStartNode != null ? <MenuItemIcon>{inlineStartNode}</MenuItemIcon> : null}
      <MenuItemContent>
        <MenuItemTitleRow>
          <MenuItemTitle>{children}</MenuItemTitle>
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
    </BaseMenu.Item>
  );
}
