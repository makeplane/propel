import type * as React from "react";

import { tableCellLayoutVariants } from "./variants";

export type TableCellLayoutProps = Omit<
  React.ComponentPropsWithoutRef<"div">,
  "className" | "style"
> & {
  /**
   * The inline layout — a leading `TableCellSlot`, a `TableCellContent`, and a trailing
   * `TableCellSlot`.
   */
  children?: React.ReactNode;
};

/**
 * The inline layout inside a plain `TableCell`: a leading `TableCellSlot`, a growing
 * `TableCellContent`, and a trailing `TableCellSlot`. Sets the slot `--node-size`.
 */
export function TableCellLayout(props: TableCellLayoutProps) {
  return <div className={tableCellLayoutVariants()} {...props} />;
}
