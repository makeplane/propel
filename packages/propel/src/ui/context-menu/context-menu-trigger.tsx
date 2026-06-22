import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";

export type ContextMenuTriggerProps = Omit<BaseContextMenu.Trigger.Props, "className" | "style">;

/** The area that opens the menu on right click or long press. Wraps `ContextMenu.Trigger` 1:1. */
export function ContextMenuTrigger(props: ContextMenuTriggerProps) {
  return <BaseContextMenu.Trigger {...props} />;
}
