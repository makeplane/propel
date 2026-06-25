import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";

import {
  type ContextMenuSubmenuTriggerVariantProps,
  contextMenuSubmenuTriggerVariants,
} from "./variants";

export type { ContextMenuSubmenuTriggerVariantProps } from "./variants";

export type ContextMenuSubmenuTriggerProps = Omit<
  BaseContextMenu.SubmenuTrigger.Props,
  "className" | "style"
> &
  ContextMenuSubmenuTriggerVariantProps;

/** The row that opens a submenu. Wraps `ContextMenu.SubmenuTrigger` 1:1. */
export function ContextMenuSubmenuTrigger({ tone, ...props }: ContextMenuSubmenuTriggerProps) {
  return (
    <BaseContextMenu.SubmenuTrigger
      className={contextMenuSubmenuTriggerVariants({ tone })}
      {...props}
    />
  );
}
