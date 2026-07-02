import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva } from "class-variance-authority";

/**
 * The muted heading naming a group of listbox options, grafted onto a Base UI `GroupLabel` in
 * `components` (`<BaseCombobox.GroupLabel render={<ListboxGroupLabel/>} />`). Matches the menu
 * group label's type treatment so grouped pickers and menus read the same.
 */
export const listboxGroupLabelVariants = cva("px-2 py-1.5 text-12 text-tertiary");

export type ListboxGroupLabelProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

export function ListboxGroupLabel({ render, ...props }: ListboxGroupLabelProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: listboxGroupLabelVariants(),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
