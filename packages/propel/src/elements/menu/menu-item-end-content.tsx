import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { menuItemEndContentVariants } from "./variants";

export type MenuItemEndContentProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/**
 * An end-content slot at the row's inline-end for arbitrary content (a shortcut, a count, a
 * chevron). Sizes any icon child to the row's `--node-size`; unlike `MenuItemIcon` it adds no tint,
 * so passed content keeps its own color.
 */
export function MenuItemEndContent({ render, ...props }: MenuItemEndContentProps) {
  const defaultProps: useRender.ElementProps<"span"> = { className: menuItemEndContentVariants() };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
