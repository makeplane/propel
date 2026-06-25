import type * as React from "react";

import { tableHeadSortIndicatorVariants } from "./variants";

export type TableHeadSortIndicatorProps = Omit<
  React.ComponentPropsWithoutRef<"span">,
  "className" | "style"
> & {
  /** The sort-direction glyph to render, sized to the trigger's `--node-size`. */
  children?: React.ReactNode;
};

/**
 * The sort chevron at the trailing edge of a `TableHeadSortTrigger`. Sizes its single glyph child
 * to the trigger's `--node-size`; the caller passes the direction glyph. Decorative (the `<th>`
 * carries `aria-sort`), so it is `aria-hidden`.
 */
export function TableHeadSortIndicator(props: TableHeadSortIndicatorProps) {
  return <span aria-hidden className={tableHeadSortIndicatorVariants()} {...props} />;
}
