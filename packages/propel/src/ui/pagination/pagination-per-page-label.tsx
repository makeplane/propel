import type * as React from "react";

import { perPageLabelVariants } from "./variants";

export type PaginationPerPageLabelProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
>;

/**
 * The trailing "per page" text after the selector pill (Figma `50 v per page`). Decorative, so
 * `aria-hidden`.
 */
export function PaginationPerPageLabel(props: PaginationPerPageLabelProps) {
  return <span aria-hidden className={perPageLabelVariants()} {...props} />;
}
