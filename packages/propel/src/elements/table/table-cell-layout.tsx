import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { tableCellLayoutVariants } from "./variants";

export type TableCellLayoutProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The inline layout inside a plain `TableCell`: a leading node slot, a growing `TableCellContent`,
 * and a trailing node slot (the shared internal `NodeSlot`). Sets the slot `--node-size`.
 */
export function TableCellLayout({ render, ...props }: TableCellLayoutProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: tableCellLayoutVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
