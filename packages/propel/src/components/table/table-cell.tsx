import type * as React from "react";

import {
  TableCell as TableCellElement,
  type TableCellProps as TableCellElementProps,
  TableCellContent,
  TableCellLayout,
} from "../../elements/table/index";
import { NodeSlot } from "../../internal/node-slot";
import { useTableMode } from "./table-context";

export type TableCellProps = Omit<TableCellElementProps, "mode"> & {
  /** Leading content beside the cell text — an icon or an `Avatar`. */
  startIcon?: React.ReactNode;
  /** Trailing content beside the cell text — an icon or an `Avatar`. */
  endIcon?: React.ReactNode;
};

/** A ready-made data cell: optional leading/trailing slots around a truncating content region. */
export function TableCell({ startIcon, endIcon, children, ...props }: TableCellProps) {
  const mode = useTableMode();
  return (
    <TableCellElement mode={mode} {...props}>
      <TableCellLayout>
        {startIcon != null ? <NodeSlot>{startIcon}</NodeSlot> : null}
        <TableCellContent>{children}</TableCellContent>
        {endIcon != null ? <NodeSlot>{endIcon}</NodeSlot> : null}
      </TableCellLayout>
    </TableCellElement>
  );
}
