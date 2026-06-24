import type * as React from "react";

import { paginationRangeCurrentVariants } from "./variants";

export type PaginationRangeCurrentProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
>;

/**
 * The emphasized current-range portion (e.g. `1-50`) inside `PaginationRange`, in the primary text
 * color.
 */
export function PaginationRangeCurrent(props: PaginationRangeCurrentProps) {
  return <span className={paginationRangeCurrentVariants()} {...props} />;
}
