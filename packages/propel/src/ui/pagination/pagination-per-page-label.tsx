import type * as React from "react";

import { paginationPerPageLabelVariants } from "./variants";

export type PaginationPerPageLabelProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
> & {
  /** The trailing text after the selector (e.g. "per page"). */
  children?: React.ReactNode;
};

/**
 * The trailing "per page" text after the selector pill (Figma `50 v per page`). Decorative, so
 * `aria-hidden`.
 */
export function PaginationPerPageLabel(props: PaginationPerPageLabelProps) {
  return <span aria-hidden className={paginationPerPageLabelVariants()} {...props} />;
}
