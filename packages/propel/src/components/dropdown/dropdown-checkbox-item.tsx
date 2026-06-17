import { Menu } from "@base-ui/react/menu";
import { cx } from "class-variance-authority";
import type * as React from "react";

import { useControllableState } from "../../hooks/use-controllable-state/index";
import { NodeSlot } from "../../internal/node-slot";
import { CheckboxVisual } from "../checkbox/index";

export type DropdownCheckboxItemProps = Omit<
  React.ComponentProps<typeof Menu.CheckboxItem>,
  "className" | "style" | "label"
> & {
  /** Leading content shown after the checkbox. */
  inlineStartNode?: React.ReactNode;
  /** The primary text of the row. */
  label?: React.ReactNode;
  /** Trailing content. */
  inlineEndNode?: React.ReactNode;
};

/** A toggleable multi-select menu row with `role="menuitemcheckbox"`. */
export function DropdownCheckboxItem({
  inlineStartNode,
  label,
  inlineEndNode,
  checked,
  defaultChecked,
  onCheckedChange,
  children,
  ...props
}: DropdownCheckboxItemProps) {
  const [isChecked, setChecked] = useControllableState<boolean>({
    value: checked,
    defaultValue: defaultChecked ?? false,
  });

  return (
    <Menu.CheckboxItem
      className={cx(
        "group/item flex h-[34px] w-full cursor-default items-center gap-2 rounded-md px-2 text-13 outline-none select-none [--node-size:1rem]",
        "text-secondary",
        "data-highlighted:bg-layer-transparent-hover",
        "data-disabled:pointer-events-none data-disabled:text-disabled",
      )}
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
    </Menu.CheckboxItem>
  );
}
