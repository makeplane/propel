import type * as React from "react";

import { tableRowVariants } from "./variants";

export type TableRowProps = Omit<React.ComponentProps<"tr">, "className" | "style">;

/** A table row (`<tr>`). */
export function TableRow(props: TableRowProps) {
  return <tr className={tableRowVariants()} {...props} />;
}
