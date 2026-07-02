import { Menu as BaseMenu } from "@base-ui/react/menu";
import { Ellipsis } from "lucide-react";
import type * as React from "react";

import {
  TableCell,
  type TableCellProps,
  TableCellTrigger,
  TableCellTriggerIndicator,
} from "../../elements/table/index";
import { Menu, type MenuProps } from "../menu";
import { useTableMode } from "./table-context";

export type TableActionCellProps = Omit<
  TableCellProps,
  "padding" | "pinned" | "children" | "mode"
> & {
  /** The menu of row actions. */
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

/** An icon-only action cell (`<td>`) that opens a row-actions menu. */
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
  const mode = useTableMode();
  return (
    <TableCell mode={mode} pinned="none" padding="trigger" {...props}>
      <Menu open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        <BaseMenu.Trigger
          disabled={disabled}
          aria-label={ariaLabel}
          render={<TableCellTrigger layout="action" />}
        >
          <TableCellTriggerIndicator>{icon ?? <Ellipsis />}</TableCellTriggerIndicator>
        </BaseMenu.Trigger>
        {children}
      </Menu>
    </TableCell>
  );
}
