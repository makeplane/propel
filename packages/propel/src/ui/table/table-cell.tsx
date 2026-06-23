import * as React from "react";

import { TableVariantContext, type TablePinned } from "./table-context";
import { pinnedCellVariants, tableCellVariants } from "./variants";

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
  const tableVariant = React.useContext(TableVariantContext);
  return (
    <td
      className={[
        tableCellVariants({ tableVariant }),
        "px-4 py-2",
        pinnedCellVariants({ pinned: pinned ?? "none" }),
      ].join(" ")}
      {...props}
    >
      <div className="flex items-center gap-2">
        {inlineStartNode != null ? (
          <span className="flex shrink-0 items-center">{inlineStartNode}</span>
        ) : null}
        <div className="min-w-0 flex-1 truncate">{children}</div>
        {inlineEndNode != null ? (
          <span className="flex shrink-0 items-center">{inlineEndNode}</span>
        ) : null}
      </div>
    </td>
  );
}
