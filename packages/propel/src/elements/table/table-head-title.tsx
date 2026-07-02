import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { tableHeadTitleVariants } from "./variants";

export type TableHeadTitleProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/** The column title inside a `TableHead`. Truncates instead of overflowing the cell. */
export function TableHeadTitle({ render, ...props }: TableHeadTitleProps) {
  const defaultProps: useRender.ElementProps<"span"> = { className: tableHeadTitleVariants() };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
