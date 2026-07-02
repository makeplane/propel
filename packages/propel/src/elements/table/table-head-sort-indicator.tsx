import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { tableHeadSortIndicatorVariants } from "./variants";

export type TableHeadSortIndicatorProps = Omit<
  useRender.ComponentProps<"span">,
  "className" | "style"
>;

/**
 * The sort chevron at the trailing edge of a `TableHeadSortTrigger`. Sizes its single glyph child
 * to the trigger's `--node-size`; the caller passes the direction glyph. Decorative (the `<th>`
 * carries `aria-sort`), so it is `aria-hidden`.
 */
export function TableHeadSortIndicator({ render, ...props }: TableHeadSortIndicatorProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: tableHeadSortIndicatorVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
