import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type ListSectionHeadingVariantProps, listSectionHeadingVariants } from "./variants";

export type ListSectionHeadingProps = Omit<useRender.ComponentProps<"div">, "className" | "style"> &
  ListSectionHeadingVariantProps;

/**
 * A static section heading that labels a group of rows — the non-interactive sibling of
 * `ListSectionTrigger`. Renders a `<div>` by default; it is a plain styled label (no button, no
 * group, no hover/focus/cursor), for settings-style sidebars whose sections don't collapse.
 */
export function ListSectionHeading({ render, ...props }: ListSectionHeadingProps) {
  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps({ className: listSectionHeadingVariants() }, props),
  });
}
