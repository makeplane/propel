import { cx } from "class-variance-authority";
import { ChevronDown } from "lucide-react";
import type * as React from "react";

import { Dropdown, DropdownTrigger, type DropdownProps } from "../dropdown/index";
import {
  actionableTriggerClass,
  pinnedCellClass,
  selectedTriggerClass,
  type TablePinned,
  useTableCellClass,
} from "./table-context";

export type TableEditableCellProps = Omit<
  React.ComponentProps<"td">,
  "className" | "style" | "children"
> & {
  /** The current value shown in the cell. */
  value: React.ReactNode;
  /** The dropdown menu shown when the cell is clicked. */
  children: React.ReactNode;
  /** Whether the menu is open (controlled). */
  open?: boolean;
  /** Default open state for an uncontrolled cell. @default false */
  defaultOpen?: boolean;
  /** Called when the menu requests to open or close. */
  onOpenChange?: DropdownProps["onOpenChange"];
  /** Disables the trigger so the cell can't be edited. */
  disabled?: boolean;
  /** Marks this as the actively-selected cell. */
  selected?: boolean;
  /** Pin this cell to the inline-start/end edge when the table scrolls sideways. */
  pinned?: TablePinned;
  /** Accessible name for the trigger when the value alone isn't descriptive. */
  "aria-label"?: string;
};

/** An editable data cell (`<td>`) with a full-cell dropdown trigger. */
export function TableEditableCell({
  value,
  children,
  open,
  defaultOpen,
  onOpenChange,
  disabled,
  selected,
  pinned,
  "aria-label": ariaLabel,
  ...props
}: TableEditableCellProps) {
  const className = useTableCellClass();
  return (
    <td className={cx(className, "p-0", pinnedCellClass(pinned))} {...props}>
      <Dropdown open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        <DropdownTrigger
          disabled={disabled}
          aria-label={ariaLabel}
          render={
            <button
              type="button"
              className={cx(
                actionableTriggerClass,
                "group/editable-cell justify-between gap-1 px-4 text-start",
                selected ? selectedTriggerClass : null,
              )}
            />
          }
        >
          <span className="min-w-0 truncate">{value}</span>
          <span className="flex size-5 shrink-0 items-center justify-center">
            <ChevronDown
              aria-hidden
              className="size-3.5 text-icon-secondary group-disabled/editable-cell:text-icon-disabled"
            />
          </span>
        </DropdownTrigger>
        {children}
      </Dropdown>
    </td>
  );
}
