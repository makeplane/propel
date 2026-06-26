import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type TableHeadVariantProps, tableHeadVariants } from "./variants";

export type TableHeadProps = Omit<useRender.ComponentProps<"th">, "className" | "style"> &
  TableHeadVariantProps;

/**
 * A header cell (`<th scope="col">`). Borders follow the `mode`. Holds a `TableHeadTitle` (or, when
 * sortable, a `TableHeadSortTrigger`).
 */
export function TableHead({ mode, pinned, render, ...props }: TableHeadProps) {
  const defaultProps: useRender.ElementProps<"th"> = {
    scope: "col",
    className: tableHeadVariants({ mode, pinned }),
  };
  return useRender({ defaultTagName: "th", render, props: mergeProps(defaultProps, props) });
}
