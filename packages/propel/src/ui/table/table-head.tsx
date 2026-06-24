import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { TablePinned, useTableVariant } from "./table-context";
import { tableHeadVariants } from "./variants";

export type TableHeadProps = Omit<useRender.ComponentProps<"th">, "className" | "style"> & {
  /** Pin this header to the inline-start/end edge when the table scrolls sideways. */
  pinned?: TablePinned;
};

/**
 * A header cell (`<th scope="col">`). Borders follow the surrounding `Table`'s variant. Holds a
 * `TableHeadTitle` (or, when sortable, a `TableHeadSortTrigger`).
 */
export function TableHead({ pinned, render, ...props }: TableHeadProps) {
  const surface = useTableVariant();
  const defaultProps: useRender.ElementProps<"th"> = {
    scope: "col",
    className: tableHeadVariants({ surface, pinned: pinned ?? "none" }),
  };
  return useRender({ defaultTagName: "th", render, props: mergeProps(defaultProps, props) });
}
