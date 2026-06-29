import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type ListItemVariantProps, listItemVariants } from "./variants";

export type ListItemProps = Omit<useRender.ComponentProps<"div">, "className" | "style"> &
  ListItemVariantProps;

/**
 * A row wrapper. Holds a primary `ListItemLink` (or `ListItemButton`) plus optional trailing
 * actions as siblings, and carries the row chrome. Renders a `<div>` by default.
 */
export function ListItem({ render, ...props }: ListItemProps) {
  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps({ className: listItemVariants() }, props),
  });
}
