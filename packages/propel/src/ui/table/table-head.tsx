import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type TablePinned, type TableMode, tableHeadVariants } from "./variants";

export type TableHeadProps = Omit<useRender.ComponentProps<"th">, "className" | "style"> & {
  /** The surrounding table's look, matching the `Table` root. */
  mode: TableMode;
  /** Pin this header to the inline-start/end edge when the table scrolls sideways. */
  pinned?: TablePinned;
};

/**
 * A header cell (`<th scope="col">`). Borders follow the `mode`. Holds a `TableHeadTitle` (or, when
 * sortable, a `TableHeadSortTrigger`).
 */
export function TableHead({ mode, pinned, render, ...props }: TableHeadProps) {
  const defaultProps: useRender.ElementProps<"th"> = {
    scope: "col",
    className: tableHeadVariants({ surface: mode, pinned: pinned ?? "none" }),
  };
  return useRender({ defaultTagName: "th", render, props: mergeProps(defaultProps, props) });
}
