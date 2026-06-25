import type * as React from "react";

import { tableHeadTitleVariants } from "./variants";

export type TableHeadTitleProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
> & {
  /** The column title text; truncates instead of overflowing. */
  children?: React.ReactNode;
};

/** The column title inside a `TableHead`. Truncates instead of overflowing the cell. */
export function TableHeadTitle(props: TableHeadTitleProps) {
  return <span className={tableHeadTitleVariants()} {...props} />;
}
