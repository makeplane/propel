import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { tableRowVariants } from "./variants";

export type TableRowProps = Omit<useRender.ComponentProps<"tr">, "className" | "style">;

/** A table row (`<tr>`). */
export function TableRow({ render, ...props }: TableRowProps) {
  const defaultProps: useRender.ElementProps<"tr"> = { className: tableRowVariants() };
  return useRender({ defaultTagName: "tr", render, props: mergeProps(defaultProps, props) });
}
