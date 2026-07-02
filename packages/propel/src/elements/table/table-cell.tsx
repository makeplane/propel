import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type TableCellVariantProps, tableCellVariants } from "./variants";

export type { TableCellPadding } from "./variants";

export type TableCellProps = Omit<useRender.ComponentProps<"td">, "className" | "style"> &
  TableCellVariantProps;

/** A data cell (`<td>`). Borders follow the `mode`. */
export function TableCell({ mode, pinned, padding, render, ...props }: TableCellProps) {
  const defaultProps: useRender.ElementProps<"td"> = {
    className: tableCellVariants({ mode, pinned, padding }),
  };
  return useRender({ defaultTagName: "td", render, props: mergeProps(defaultProps, props) });
}
