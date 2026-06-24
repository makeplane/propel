import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { TablePinned, useTableVariant } from "./table-context";
import { tableCellVariants } from "./variants";

export type TableCellPadding = "cell" | "trigger";

export type TableCellProps = Omit<useRender.ComponentProps<"td">, "className" | "style"> & {
  /** Pin this cell to the inline-start/end edge when the table scrolls sideways. */
  pinned?: TablePinned;
  /**
   * Inner spacing. `cell` (default) pads the content; `trigger` drops the padding so a full-cell
   * trigger (an editable/action cell) can fill the cell.
   */
  padding?: TableCellPadding;
};

/** A data cell (`<td>`). Borders follow the surrounding `Table`'s variant. */
export function TableCell({ pinned, padding = "cell", render, ...props }: TableCellProps) {
  const surface = useTableVariant();
  const defaultProps: useRender.ElementProps<"td"> = {
    className: tableCellVariants({ surface, pinned: pinned ?? "none", padding }),
  };
  return useRender({ defaultTagName: "td", render, props: mergeProps(defaultProps, props) });
}
