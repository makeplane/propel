import type * as React from "react";

import { useControllableState } from "../../hooks/use-controllable-state/index";
import { CheckboxVisual } from "../../ui/checkbox/index";
import {
  MenuCheckboxItem as MenuCheckboxItemElement,
  type MenuCheckboxItemProps as MenuCheckboxItemElementProps,
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
  /** The primary text of the row. */
  label?: React.ReactNode;
  /** Trailing content. */
  inlineEndNode?: React.ReactNode;
};

/**
 * The ready-made toggleable multi-select menu row: composes the atomic `MenuCheckboxItem` and lays
 * out the propel `CheckboxVisual`, optional leading/trailing nodes, and the label.
 */
export function MenuCheckboxItem({
  inlineStartNode,
  label,
  inlineEndNode,
  checked,
  defaultChecked,
  onCheckedChange,
  children,
  ...props
}: MenuCheckboxItemProps) {
  const [isChecked, setChecked] = useControllableState<boolean>({
    value: checked,
    defaultValue: defaultChecked ?? false,
  });

  return (
    <MenuCheckboxItemElement
      checked={checked}
      defaultChecked={defaultChecked}
      onCheckedChange={(next, details) => {
        setChecked(next);
        onCheckedChange?.(next, details);
      }}
      {...props}
    >
      <MenuItemControl>
        <CheckboxVisual tone="neutral" checked={isChecked} disabled={props.disabled} />
      </MenuItemControl>
      {inlineStartNode != null ? <MenuItemIcon>{inlineStartNode}</MenuItemIcon> : null}
      <MenuItemContent>
        <MenuItemTitleRow>
          <MenuItemTitle>{label ?? children}</MenuItemTitle>
        </MenuItemTitleRow>
      </MenuItemContent>
      {inlineEndNode != null ? <MenuItemMeta>{inlineEndNode}</MenuItemMeta> : null}
    </MenuCheckboxItemElement>
  );
}
