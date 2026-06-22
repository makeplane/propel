import type * as React from "react";

export type TableRowProps = Omit<React.ComponentProps<"tr">, "className" | "style">;

/** A table row (`<tr>`). */
export function TableRow(props: TableRowProps) {
  return <tr className="group/body-row bg-layer-2 hover:bg-layer-2-hover" {...props} />;
}
