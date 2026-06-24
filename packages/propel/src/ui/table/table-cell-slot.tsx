import type * as React from "react";

import { tableCellSlotVariants } from "./variants";

export type TableCellSlotProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
>;

/**
 * A leading/trailing slot beside cell content (an icon or an `Avatar`). Sizes its single child to
 * the cell's `--node-size`; callers pass a bare node.
 */
export function TableCellSlot(props: TableCellSlotProps) {
  return <span className={tableCellSlotVariants()} {...props} />;
}
