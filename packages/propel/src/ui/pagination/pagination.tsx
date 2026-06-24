import type * as React from "react";

import { paginationVariants } from "./variants";

export type PaginationProps = Omit<React.ComponentProps<"nav">, "className" | "style">;

/**
 * The pagination landmark: a `<nav>` wrapping the optional per-page region, range label, and the
 * page-control list.
 */
export function Pagination(props: PaginationProps) {
  return <nav className={paginationVariants()} {...props} />;
}
