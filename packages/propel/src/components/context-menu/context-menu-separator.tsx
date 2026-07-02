import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";

import { ContextMenuSeparator as ContextMenuSeparatorElement } from "../../elements/context-menu";

export type ContextMenuSeparatorProps = Omit<
  BaseContextMenu.Separator.Props,
  "className" | "style"
>;

/**
 * Ready-made divider between groups of items: Base UI's `ContextMenu.Separator` behavior (the
 * `separator` role) grafted onto the styled thin rule.
 */
export function ContextMenuSeparator(props: ContextMenuSeparatorProps) {
  return <BaseContextMenu.Separator {...props} render={<ContextMenuSeparatorElement />} />;
}
