import { ChevronDown } from "lucide-react";
import type * as React from "react";

import { Menu, MenuTrigger, type MenuProps } from "../../ui/menu/index";
import {
  TableCell,
  type TableCellProps,
  TableCellTrigger,
  TableCellTriggerIndicator,
  TableCellTriggerLabel,
} from "../../ui/table/index";
import { useTableMode } from "./table-context";

export type TableEditableCellProps = Omit<
  TableCellProps,
  "padding" | "pinned" | "children" | "mode"
> & {
  /** The current value shown in the cell. */
  value: React.ReactNode;
  /** The menu shown when the cell is clicked. */
  children: React.ReactNode;
  /** Whether the menu is open (controlled). */
  open?: boolean;
  /** Default open state for an uncontrolled cell. @default false */
  defaultOpen?: boolean;
  /** Called when the menu requests to open or close. */
  onOpenChange?: MenuProps["onOpenChange"];
  /** Disables the trigger so the cell can't be edited. */
  disabled?: boolean;
  /** Marks this as the actively-selected cell. */
  selected?: boolean;
  /** Accessible name for the trigger when the value alone isn't descriptive. */
  "aria-label"?: string;
};

/** An editable data cell (`<td>`) with a full-cell menu trigger. */
export function TableEditableCell({
  value,
  children,
  open,
  defaultOpen,
  onOpenChange,
  disabled,
  selected,
  "aria-label": ariaLabel,
  ...props
}: TableEditableCellProps) {
  const mode = useTableMode();
  return (
    <TableCell mode={mode} pinned="none" padding="trigger" {...props}>
      <Menu open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        <MenuTrigger
          disabled={disabled}
          aria-label={ariaLabel}
          render={<TableCellTrigger layout="editable" selected={selected} />}
        >
          <TableCellTriggerLabel>{value}</TableCellTriggerLabel>
          <TableCellTriggerIndicator>
            <ChevronDown />
          </TableCellTriggerIndicator>
        </MenuTrigger>
        {children}
      </Menu>
    </TableCell>
  );
}
