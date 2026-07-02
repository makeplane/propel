import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type ContextMenuItemVariantProps, contextMenuItemVariants } from "./variants";

export type ContextMenuCheckboxItemProps = Omit<
  useRender.ComponentProps<"div">,
  "className" | "style"
> &
  ContextMenuItemVariantProps;

/**
 * The styled checkbox menu row. Base-UI-agnostic — graft the checkbox-item behavior in `components`
 * via `<BaseContextMenu.CheckboxItem render={<ContextMenuCheckboxItem tone="neutral"/>} />`.
 */
export function ContextMenuCheckboxItem({ tone, render, ...props }: ContextMenuCheckboxItemProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: contextMenuItemVariants({ tone }),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
