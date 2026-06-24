import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type TablePinned, type TableVariant, tableHeadVariants } from "./variants";

export type TableHeadProps = Omit<useRender.ComponentProps<"th">, "className" | "style"> & {
  /** The surrounding table's look, matching the `Table` root. */
  variant: TableVariant;
  /** Pin this header to the inline-start/end edge when the table scrolls sideways. */
  pinned?: TablePinned;
};

/**
 * A header cell (`<th scope="col">`). Borders follow the `variant`. Holds a `TableHeadTitle` (or,
 * when sortable, a `TableHeadSortTrigger`).
 */
export function TableHead({ variant, pinned, render, ...props }: TableHeadProps) {
  const defaultProps: useRender.ElementProps<"th"> = {
    scope: "col",
    className: tableHeadVariants({ surface: variant, pinned: pinned ?? "none" }),
  };
  return useRender({ defaultTagName: "th", render, props: mergeProps(defaultProps, props) });
}
