import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type ContextMenuItemVariantProps, contextMenuItemVariants } from "./variants";

export type { ContextMenuItemTone } from "./variants";

export type ContextMenuItemProps = Omit<useRender.ComponentProps<"div">, "className" | "style"> &
  ContextMenuItemVariantProps;

/**
 * The styled interactive menu row. Base-UI-agnostic — graft the item behavior in `components` via
 * `<BaseContextMenu.Item render={<ContextMenuItem tone="neutral"/>} />`.
 */
export function ContextMenuItem({ tone, render, ...props }: ContextMenuItemProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: contextMenuItemVariants({ tone }),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
