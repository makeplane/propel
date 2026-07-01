import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type ListItemLabelVariantProps, listItemLabelVariants } from "./variants";

export type ListItemLabelProps = Omit<useRender.ComponentProps<"span">, "className" | "style"> &
  ListItemLabelVariantProps;

/** The row's label — fills the remaining width and truncates. Renders a `<span>` by default. */
export function ListItemLabel({ render, ...props }: ListItemLabelProps) {
  return useRender({
    defaultTagName: "span",
    render,
    props: mergeProps({ className: listItemLabelVariants() }, props),
  });
}
