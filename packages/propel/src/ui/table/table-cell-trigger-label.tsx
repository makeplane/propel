import type * as React from "react";

import { tableCellTriggerLabelVariants } from "./variants";

export type TableCellTriggerLabelProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
> & {
  /** The cell's value text; truncates instead of overflowing. */
  children?: React.ReactNode;
};

/** The truncating value text inside an editable `TableCellTrigger`. */
export function TableCellTriggerLabel(props: TableCellTriggerLabelProps) {
  return <span className={tableCellTriggerLabelVariants()} {...props} />;
}
