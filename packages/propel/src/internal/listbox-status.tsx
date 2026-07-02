import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva } from "class-variance-authority";

import { listboxEmptyClass } from "./listbox-empty";

/**
 * The muted status hint inside a listbox popup ("Searching…", "12 results"), sharing the Empty
 * region's type treatment and its collapse-when-childless behavior.
 */
export const listboxStatusVariants = cva(listboxEmptyClass);

export type ListboxStatusProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

export function ListboxStatus({ render, ...props }: ListboxStatusProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: listboxStatusVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
