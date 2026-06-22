import type * as React from "react";

import { useControllableState } from "../../hooks/use-controllable-state/index";
import { NodeSlot } from "../../internal/node-slot";
import { CheckboxVisual } from "../../ui/checkbox/index";
import {
  MenuCheckboxItem as MenuCheckboxItemRoot,
  type MenuCheckboxItemProps as MenuCheckboxItemRootProps,
} from "../../ui/menu";

export type MenuCheckboxItemProps = MenuCheckboxItemRootProps & {
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
    <MenuCheckboxItemRoot
      checked={checked}
      defaultChecked={defaultChecked}
      onCheckedChange={(next, details) => {
        setChecked(next);
        onCheckedChange?.(next, details);
      }}
      {...props}
    >
      <span className="flex shrink-0 items-center">
        <CheckboxVisual tone="neutral" checked={isChecked} disabled={props.disabled} />
      </span>
      {inlineStartNode != null ? <NodeSlot>{inlineStartNode}</NodeSlot> : null}
      <span className="min-w-0 flex-1 truncate">{label ?? children}</span>
      {inlineEndNode != null ? (
        <span className="shrink-0 text-12 text-tertiary">{inlineEndNode}</span>
      ) : null}
    </MenuCheckboxItemRoot>
  );
}
