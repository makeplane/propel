import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";

import { contextMenuItemIndicatorVariants } from "./variants";

export type ContextMenuCheckboxItemIndicatorProps = Omit<
  BaseContextMenu.CheckboxItemIndicator.Props,
  "className" | "style"
>;

/**
 * Shows whether the checkbox item is ticked. Sizes its single child (the tick icon) to the row's
 * `--node-size`. Wraps `ContextMenu.CheckboxItemIndicator` 1:1.
 */
export function ContextMenuCheckboxItemIndicator(props: ContextMenuCheckboxItemIndicatorProps) {
  return (
    <BaseContextMenu.CheckboxItemIndicator
      className={contextMenuItemIndicatorVariants()}
      {...props}
    />
  );
}
