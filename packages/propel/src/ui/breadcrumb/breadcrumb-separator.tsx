import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { breadcrumbSeparatorVariants } from "./variants";

export type BreadcrumbSeparatorProps = Omit<useRender.ComponentProps<"li">, "className" | "style">;

/**
 * The visual divider between crumbs. A node-slot: it sizes its single child (icon or character), so
 * callers pass the divider glyph as `children`. Decorative, so it is removed from the a11y tree.
 */
export function BreadcrumbSeparator({ render, ...props }: BreadcrumbSeparatorProps) {
  const defaultProps: useRender.ElementProps<"li"> = {
    "aria-hidden": true,
    role: "presentation",
    className: breadcrumbSeparatorVariants(),
  };
  return useRender({ defaultTagName: "li", render, props: mergeProps(defaultProps, props) });
}
