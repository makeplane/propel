import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import { Check } from "lucide-react";

import { contextMenuItemIndicatorVariants } from "./variants";

export type ContextMenuCheckboxItemIndicatorProps = Omit<
  BaseContextMenu.CheckboxItemIndicator.Props,
  "className" | "style"
>;

/** Shows whether the checkbox item is ticked. Wraps `ContextMenu.CheckboxItemIndicator` 1:1. */
export function ContextMenuCheckboxItemIndicator(props: ContextMenuCheckboxItemIndicatorProps) {
  return (
    <BaseContextMenu.CheckboxItemIndicator
      className={contextMenuItemIndicatorVariants()}
      {...props}
    >
      {props.children ?? <Check className="size-4" aria-hidden="true" />}
    </BaseContextMenu.CheckboxItemIndicator>
  );
}
