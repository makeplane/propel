import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { toolbarItemIconVariants } from "./variants";

export type ToolbarItemIconProps = Omit<useRender.ComponentProps<"span">, "className" | "style">;

/**
 * The glyph inside a `ToolbarButton` or toolbar toggle. A styled, `aria-hidden` `<span>` that sizes
 * its single child to the control's `--node-size` (driven by the toolbar's density), so callers
 * pass a bare icon. Decorative (the control carries the accessible name), so it is `aria-hidden`.
 * Base-UI-agnostic.
 */
export function ToolbarItemIcon({ render, ...props }: ToolbarItemIconProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: toolbarItemIconVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
