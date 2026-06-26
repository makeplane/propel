import type * as React from "react";

import {
  TableCell as TableCellElement,
  type TableCellProps as TableCellElementProps,
  TableCellContent,
  TableCellLayout,
  TableCellSlot,
} from "../../ui/table/index";
import { useTableMode } from "./table-context";

export type TableCellProps = Omit<TableCellElementProps, "padding" | "mode"> & {
  /** Leading content beside the cell text — an icon or an `Avatar`. */
  inlineStartNode?: React.ReactNode;
  /** Trailing content beside the cell text — an icon or an `Avatar`. */
  inlineEndNode?: React.ReactNode;
};

/** A ready-made data cell: optional leading/trailing slots around a truncating content region. */
export function TableCell({ inlineStartNode, inlineEndNode, children, ...props }: TableCellProps) {
  const mode = useTableMode();
  return (
    <TableCellElement mode={mode} {...props}>
      <TableCellLayout>
        {inlineStartNode != null ? <TableCellSlot>{inlineStartNode}</TableCellSlot> : null}
        <TableCellContent>{children}</TableCellContent>
        {inlineEndNode != null ? <TableCellSlot>{inlineEndNode}</TableCellSlot> : null}
      </TableCellLayout>
    </TableCellElement>
  );
}
