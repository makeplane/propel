import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { tableHeaderVariants } from "./variants";

export type TableHeaderProps = Omit<useRender.ComponentProps<"thead">, "className" | "style">;

/** Header section (`<thead>`). Holds a single `TableRow` of `TableHead` cells. */
export function TableHeader({ render, ...props }: TableHeaderProps) {
  const defaultProps: useRender.ElementProps<"thead"> = { className: tableHeaderVariants() };
  return useRender({ defaultTagName: "thead", render, props: mergeProps(defaultProps, props) });
}
