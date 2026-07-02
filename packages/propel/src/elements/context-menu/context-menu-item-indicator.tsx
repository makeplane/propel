import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { contextMenuItemIndicatorVariants } from "./variants";

export type ContextMenuItemIndicatorProps = Omit<
  useRender.ComponentProps<"span">,
  "className" | "style"
>;

/**
 * The trailing selection-check region of a single-select `ContextMenuItem`. Sizes its single child
 * to the row's `--node-size` and tints it accent. Decorative (the row carries the selected state),
 * so it is `aria-hidden`. Base-UI-agnostic.
 */
export function ContextMenuItemIndicator({ render, ...props }: ContextMenuItemIndicatorProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    "aria-hidden": true,
    className: contextMenuItemIndicatorVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
