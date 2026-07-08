import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva } from "class-variance-authority";

/**
 * The muted heading naming a group of listbox options, grafted onto a Base UI `GroupLabel` in
 * `components` (`<BaseCombobox.GroupLabel render={<ListboxGroupLabel/>} />`). Matches the menu
 * group label's type treatment so grouped pickers and menus read the same. `text-caption-md-medium`
 * (not the bare `text-12 font-medium`) so the row picks up the preset's `1.2` line-height — the
 * bare utility fell back to the browser's normal (~1.5×) line-height, rendering the heading taller
 * than the Figma "caption/md" spec.
 */
export const listboxGroupLabelVariants = cva("px-2 py-1.5 text-caption-md-medium text-tertiary");
export const groupLabelClass = "px-2 py-1.5 text-caption-md-medium text-tertiary";

export type ListboxGroupLabelProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

export function ListboxGroupLabel({ render, ...props }: ListboxGroupLabelProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: listboxGroupLabelVariants(),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
