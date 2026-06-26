import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { tableBodyVariants } from "./variants";

export type TableBodyProps = Omit<useRender.ComponentProps<"tbody">, "className" | "style">;

/** Body section (`<tbody>`). Holds the data `TableRow`s. */
export function TableBody({ render, ...props }: TableBodyProps) {
  const defaultProps: useRender.ElementProps<"tbody"> = { className: tableBodyVariants() };
  return useRender({ defaultTagName: "tbody", render, props: mergeProps(defaultProps, props) });
}
