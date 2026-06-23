import type * as React from "react";

import { paginationPerPageVariants } from "./variants";

export type PaginationPerPageProps = Omit<React.ComponentProps<"div">, "className" | "style">;

/**
 * The per-page region: the selector pill (`PaginationPerPageTrigger`) followed by the trailing
 * `PaginationPerPageLabel`.
 */
export function PaginationPerPage(props: PaginationPerPageProps) {
  return <div className={paginationPerPageVariants()} {...props} />;
}
