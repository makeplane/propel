import type * as React from "react";

import {
  TableCell as TableCellElement,
  type TableCellProps as TableCellElementProps,
  TableCellContent,
  TableCellLayout,
} from "../../elements/table/index";
import { useTableMode } from "./table-context";

export type TableCellProps = Omit<TableCellElementProps, "children" | "mode"> & {
  /** Leading element beside the cell text, e.g. `<Icon icon={...} />` or an `Avatar`. */
  startIcon?: React.ReactNode;
  /** Trailing element beside the cell text, e.g. `<Icon icon={...} />` or an `Avatar`. */
  endIcon?: React.ReactNode;
  /** Cell content. */
  children?: React.ReactNode;
};

/** A ready-made data cell: optional leading/trailing slots around a truncating content region. */
export function TableCell({ startIcon, endIcon, children, ...props }: TableCellProps) {
  const mode = useTableMode();
  return (
    <TableCellElement mode={mode} {...props}>
      <TableCellLayout>
        {startIcon}
        <TableCellContent>{children}</TableCellContent>
        {endIcon}
      </TableCellLayout>
    </TableCellElement>
  );
}
