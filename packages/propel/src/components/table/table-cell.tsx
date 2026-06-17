import { cx } from "class-variance-authority";
import type * as React from "react";

import {
  pinnedCellClass,
  TableCellSlot,
  type TablePinned,
  useTableCellClass,
} from "./table-context";

export type TableCellProps = Omit<React.ComponentProps<"td">, "className" | "style"> & {
  /** Leading content beside the cell text — an icon or an `Avatar`. */
  inlineStartNode?: React.ReactNode;
  /** Trailing content beside the cell text — an icon or an `Avatar`. */
  inlineEndNode?: React.ReactNode;
  /** Pin this cell to the inline-start/end edge when the table scrolls sideways. */
  pinned?: TablePinned;
};

/** A data cell (`<td>`). */
export function TableCell({
  inlineStartNode,
  inlineEndNode,
  pinned,
  children,
  ...props
}: TableCellProps) {
  const className = useTableCellClass();
  return (
    <td className={cx(className, "px-4 py-2", pinnedCellClass(pinned))} {...props}>
      <div className="flex items-center gap-2">
        {inlineStartNode != null ? <TableCellSlot>{inlineStartNode}</TableCellSlot> : null}
        <div className="min-w-0 flex-1 truncate">{children}</div>
        {inlineEndNode != null ? <TableCellSlot>{inlineEndNode}</TableCellSlot> : null}
      </div>
    </td>
  );
}
