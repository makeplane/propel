import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { tableCellSlotVariants } from "./variants";

export type TableCellSlotProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/**
 * A leading/trailing slot beside cell content (an icon or an `Avatar`). Sizes its single child to
 * the cell's `--node-size`; callers pass a bare node.
 */
export function TableCellSlot({ render, ...props }: TableCellSlotProps) {
  const defaultProps: useRender.ElementProps<"span"> = { className: tableCellSlotVariants() };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
