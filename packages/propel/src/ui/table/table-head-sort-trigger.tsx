import type * as React from "react";

import { tableHeadSortTriggerVariants } from "./variants";

export type TableHeadSortTriggerProps = Omit<
  React.ComponentPropsWithoutRef<"button">,
  "className" | "style" | "type"
>;

/**
 * The sort control inside a sortable `TableHead`: a `<button>` wrapping the `TableHeadTitle` and a
 * trailing `TableHeadSortIndicator`. Clicking it cycles the column's sort order.
 */
export function TableHeadSortTrigger(props: TableHeadSortTriggerProps) {
  return <button type="button" className={tableHeadSortTriggerVariants()} {...props} />;
}
