import type * as React from "react";

import { rangeVariants } from "./variants";

export type PaginationRangeProps = Omit<React.ComponentProps<"p">, "className" | "style">;

/**
 * The optional range label shown before the controls (Figma `1-50 of 250`): tertiary, nowrap. The
 * current range inside it is emphasized via `PaginationRangeCurrent`.
 */
export function PaginationRange(props: PaginationRangeProps) {
  return <p className={rangeVariants()} {...props} />;
}
