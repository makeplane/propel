import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import { Check } from "lucide-react";
import type * as React from "react";

import { contextMenuItemIndicatorVariants } from "./variants";

export type ContextMenuCheckboxItemIndicatorProps = Omit<
  React.ComponentProps<typeof BaseContextMenu.CheckboxItemIndicator>,
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
