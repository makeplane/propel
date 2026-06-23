import { Ellipsis } from "lucide-react";
import type * as React from "react";

import { Menu, MenuTrigger, type MenuProps } from "../../ui/menu/index";
import {
  TableCell,
  type TableCellProps,
  TableCellTrigger,
  TableCellTriggerIndicator,
} from "../../ui/table/index";

export type TableActionCellProps = Omit<TableCellProps, "padding" | "children"> & {
  /** The dropdown menu of row actions. */
  children: React.ReactNode;
  /** Accessible name for the trigger (e.g. "Row options"). Required (icon-only). */
  "aria-label": string;
  /** Trigger glyph. @default an ellipsis. */
  icon?: React.ReactNode;
  /** Whether the menu is open (controlled). Pair with `onOpenChange`. */
  open?: boolean;
  /** Default open state for an uncontrolled cell. @default false */
  defaultOpen?: boolean;
  /** Called when the menu requests to open or close. */
  onOpenChange?: MenuProps["onOpenChange"];
  /** Disables the trigger. */
  disabled?: boolean;
};

/** An icon-only action cell (`<td>`) that opens a row-actions dropdown. */
export function TableActionCell({
  children,
  "aria-label": ariaLabel,
  icon,
  open,
  defaultOpen,
  onOpenChange,
  disabled,
  ...props
}: TableActionCellProps) {
  return (
    <TableCell padding="trigger" {...props}>
      <Menu open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        <MenuTrigger
          disabled={disabled}
          aria-label={ariaLabel}
          render={<TableCellTrigger variant="action" />}
        >
          <TableCellTriggerIndicator>{icon ?? <Ellipsis />}</TableCellTriggerIndicator>
        </MenuTrigger>
        {children}
      </Menu>
    </TableCell>
  );
}
