import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { contextMenuCheckboxItemIndicatorVariants } from "./variants";

export type ContextMenuCheckboxItemIndicatorProps = Omit<
  useRender.ComponentProps<"span">,
  "className" | "style"
>;

/**
 * The styled tick region of a checkbox menu row. Sizes its single child (the tick icon) to the
 * row's `--node-size`. Base-UI-agnostic — graft in `components` via
 * `<BaseContextMenu.CheckboxItemIndicator render={<ContextMenuCheckboxItemIndicator/>} />`.
 */
export function ContextMenuCheckboxItemIndicator({
  render,
  ...props
}: ContextMenuCheckboxItemIndicatorProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    className: contextMenuCheckboxItemIndicatorVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
