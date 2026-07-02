import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { tableHeadSortTriggerVariants } from "./variants";

export type TableHeadSortTriggerProps = Omit<
  useRender.ComponentProps<"button">,
  "className" | "style" | "type"
>;

/**
 * The sort control inside a sortable `TableHead`: a `<button>` wrapping the `TableHeadTitle` and a
 * trailing `TableHeadSortIndicator`. Clicking it cycles the column's sort order.
 */
export function TableHeadSortTrigger({ render, ...props }: TableHeadSortTriggerProps) {
  const defaultProps: useRender.ElementProps<"button"> = {
    type: "button",
    className: tableHeadSortTriggerVariants(),
  };
  return useRender({ defaultTagName: "button", render, props: mergeProps(defaultProps, props) });
}
