import type * as React from "react";

import {
  TableCell as TableCellRoot,
  type TableCellProps as TableCellRootProps,
  TableCellContent,
  TableCellLayout,
  TableCellSlot,
} from "../../ui/table/index";
import { useTableVariant } from "./table-context";

export type TableCellProps = Omit<TableCellRootProps, "padding" | "variant"> & {
  /** Leading content beside the cell text — an icon or an `Avatar`. */
  inlineStartNode?: React.ReactNode;
  /** Trailing content beside the cell text — an icon or an `Avatar`. */
  inlineEndNode?: React.ReactNode;
};

/** A ready-made data cell: optional leading/trailing slots around a truncating content region. */
export function TableCell({ inlineStartNode, inlineEndNode, children, ...props }: TableCellProps) {
  const variant = useTableVariant();
  return (
    <TableCellRoot variant={variant} {...props}>
      <TableCellLayout>
        {inlineStartNode != null ? <TableCellSlot>{inlineStartNode}</TableCellSlot> : null}
        <TableCellContent>{children}</TableCellContent>
        {inlineEndNode != null ? <TableCellSlot>{inlineEndNode}</TableCellSlot> : null}
      </TableCellLayout>
    </TableCellRoot>
  );
}
