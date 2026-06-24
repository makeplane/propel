import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";

import { contextMenuItemIndicatorVariants } from "./variants";

export type ContextMenuRadioItemIndicatorProps = Omit<
  BaseContextMenu.RadioItemIndicator.Props,
  "className" | "style"
>;

/**
 * Shows whether the radio item is selected. Sizes its single child (the selection icon) to the
 * row's `--node-size`. Wraps `ContextMenu.RadioItemIndicator` 1:1.
 */
export function ContextMenuRadioItemIndicator(props: ContextMenuRadioItemIndicatorProps) {
  return (
    <BaseContextMenu.RadioItemIndicator className={contextMenuItemIndicatorVariants()} {...props} />
  );
}
