import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { contextMenuItemIconVariants } from "./variants";

export type ContextMenuItemIconProps = Omit<
  useRender.ComponentProps<"span">,
  "className" | "style"
>;

/**
 * The leading icon region of a menu row. Sizes its single child to the row's `--node-size`, so
 * callers pass a bare icon. Decorative (the row's label carries the accessible name), so it is
 * `aria-hidden`. Base-UI-agnostic.
 */
export function ContextMenuItemIcon({ render, ...props }: ContextMenuItemIconProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: contextMenuItemIconVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
