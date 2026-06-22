import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import { Check } from "lucide-react";

import { contextMenuItemIndicatorVariants } from "./variants";

export type ContextMenuRadioItemIndicatorProps = Omit<
  BaseContextMenu.RadioItemIndicator.Props,
  "className" | "style"
>;

/** Shows whether the radio item is selected. Wraps `ContextMenu.RadioItemIndicator` 1:1. */
export function ContextMenuRadioItemIndicator(props: ContextMenuRadioItemIndicatorProps) {
  return (
    <BaseContextMenu.RadioItemIndicator className={contextMenuItemIndicatorVariants()} {...props}>
      {props.children ?? <Check className="size-4" aria-hidden="true" />}
    </BaseContextMenu.RadioItemIndicator>
  );
}
