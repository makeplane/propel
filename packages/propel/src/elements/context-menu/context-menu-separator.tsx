import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { contextMenuSeparatorVariants } from "./variants";

export type ContextMenuSeparatorProps = Omit<
  useRender.ComponentProps<"div">,
  "className" | "style"
>;

/**
 * The styled thin divider between groups of items. Base-UI-agnostic — graft in `components` via
 * `<BaseContextMenu.Separator render={<ContextMenuSeparator/>} />`.
 */
export function ContextMenuSeparator({ render, ...props }: ContextMenuSeparatorProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: contextMenuSeparatorVariants(),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
