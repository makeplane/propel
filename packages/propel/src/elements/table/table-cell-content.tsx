import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { tableCellContentVariants } from "./variants";

export type TableCellContentProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/** The growing text region inside a `TableCellLayout`. Truncates instead of overflowing. */
export function TableCellContent({ render, ...props }: TableCellContentProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: tableCellContentVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
