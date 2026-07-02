import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { menuItemIconVariants } from "./variants";

export type MenuItemIconProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/**
 * A decorative leading icon at a row's inline-start. Sizes its single child to the row's
 * `--node-size`, so callers pass a bare icon. Decorative (the row carries the accessible name), so
 * it is `aria-hidden`.
 */
export function MenuItemIcon({ render, ...props }: MenuItemIconProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: menuItemIconVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
