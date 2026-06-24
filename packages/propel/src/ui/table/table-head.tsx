import type * as React from "react";

import { TablePinned, useTableVariant } from "./table-context";
import { tableHeadVariants } from "./variants";

export type TableHeadProps = Omit<React.ComponentProps<"th">, "className" | "style"> & {
  /** Pin this header to the inline-start/end edge when the table scrolls sideways. */
  pinned?: TablePinned;
};

/**
 * A header cell (`<th scope="col">`). Borders follow the surrounding `Table`'s variant. Holds a
 * `TableHeadTitle` (or, when sortable, a `TableHeadSortTrigger`).
 */
export function TableHead({ pinned, ...props }: TableHeadProps) {
  const surface = useTableVariant();
  return (
    <th
      scope="col"
      className={tableHeadVariants({ surface, pinned: pinned ?? "none" })}
      {...props}
    />
  );
}
