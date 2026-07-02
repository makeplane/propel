import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { tableCellTriggerIndicatorVariants } from "./variants";

export type TableCellTriggerIndicatorProps = Omit<
  useRender.ComponentProps<"span">,
  "className" | "style"
>;

/**
 * The trailing glyph slot inside a `TableCellTrigger` (the editable chevron, the action ellipsis).
 * Sizes its single child to the trigger's `--node-size` and tints it, dimming when the trigger is
 * disabled. Decorative, so it is `aria-hidden`.
 */
export function TableCellTriggerIndicator({ render, ...props }: TableCellTriggerIndicatorProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: tableCellTriggerIndicatorVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
