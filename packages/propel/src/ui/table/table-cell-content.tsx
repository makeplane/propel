import type * as React from "react";

import { tableCellContentVariants } from "./variants";

export type TableCellContentProps = Omit<
  React.ComponentPropsWithoutRef<"div">,
  "className" | "style"
> & {
  /** The cell's text content; truncates instead of overflowing. */
  children?: React.ReactNode;
};

/** The growing text region inside a `TableCellLayout`. Truncates instead of overflowing. */
export function TableCellContent(props: TableCellContentProps) {
  return <div className={tableCellContentVariants()} {...props} />;
}
