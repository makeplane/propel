import type * as React from "react";

import { paginationListVariants } from "./variants";

export type PaginationListProps = Omit<React.ComponentProps<"ul">, "className" | "style">;

/**
 * The ordered list of page controls: the previous button, page numbers and ellipses, and the next
 * button.
 */
export function PaginationList(props: PaginationListProps) {
  return <ul className={paginationListVariants()} {...props} />;
}
