import type * as React from "react";

import { paginationItemVariants } from "./variants";

export type PaginationItemProps = Omit<React.ComponentProps<"li">, "className" | "style">;

/** One slot in the pagination list, holding a page button, an arrow button, or the ellipsis. */
export function PaginationItem(props: PaginationItemProps) {
  return <li className={paginationItemVariants()} {...props} />;
}
