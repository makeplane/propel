import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { menuItemTrailingVariants } from "./variants";

export type MenuItemTrailingProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/**
 * A trailing slot at the row's inline-end for arbitrary content (a shortcut, a count, a chevron).
 * Sizes any icon child to the row's `--node-size`; unlike `MenuItemIcon` it adds no tint, so passed
 * content keeps its own color.
 */
export function MenuItemTrailing({ render, ...props }: MenuItemTrailingProps) {
  const defaultProps: useRender.ElementProps<"span"> = { className: menuItemTrailingVariants() };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
