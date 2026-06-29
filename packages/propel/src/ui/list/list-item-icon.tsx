import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type ListItemIconVariantProps, listItemIconVariants } from "./variants";

export type ListItemIconProps = Omit<useRender.ComponentProps<"span">, "className" | "style"> &
  ListItemIconVariantProps;

/**
 * The leading slot of a row — pass an icon or an `Avatar` as `children`; the slot sizes it. Renders
 * a `<span>` by default. Decorative: the row's label names it, so keep the glyph `aria-hidden`.
 */
export function ListItemIcon({ render, ...props }: ListItemIconProps) {
  return useRender({
    defaultTagName: "span",
    render,
    props: mergeProps({ className: listItemIconVariants() }, props),
  });
}
