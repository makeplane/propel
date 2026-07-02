import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { contextMenuItemLabelVariants } from "./variants";

export type ContextMenuItemLabelProps = Omit<
  useRender.ComponentProps<"span">,
  "className" | "style"
>;

/**
 * The label region of a menu row. Grows to fill the row so trailing regions (shortcut, indicator,
 * submenu caret) sit at the inline-end; truncates rather than overflowing. Base-UI-agnostic.
 */
export function ContextMenuItemLabel({ render, ...props }: ContextMenuItemLabelProps) {
  const defaultProps: useRender.ElementProps<"span"> = {
    className: contextMenuItemLabelVariants(),
  };
  return useRender({ defaultTagName: "span", render, props: mergeProps(defaultProps, props) });
}
