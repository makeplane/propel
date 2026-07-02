import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { contextMenuRadioItemIndicatorVariants } from "./variants";

export type ContextMenuRadioItemIndicatorProps = Omit<
  useRender.ComponentProps<"span">,
  "className" | "style"
>;

/**
 * The styled selection region of a radio menu row. Sizes its single child (the selection icon) to
 * the row's `--node-size`. Base-UI-agnostic — graft in `components` via
 * `<BaseContextMenu.RadioItemIndicator render={<ContextMenuRadioItemIndicator/>} />`.
 */
export function ContextMenuRadioItemIndicator({
  render,
  ...props
}: ContextMenuRadioItemIndicatorProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    className: contextMenuRadioItemIndicatorVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
