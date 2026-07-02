import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";

export type ContextMenuTriggerProps = Omit<BaseContextMenu.Trigger.Props, "className" | "style">;

/**
 * The behavior surface that opens the menu on right click or long press — Base UI applies no
 * styling of its own, so give it a look by grafting it onto your own element via `render`:
 *
 * ```tsx
 * <ContextMenuTrigger render={<MyCanvasArea />}>Right-click here</ContextMenuTrigger>;
 * ```
 *
 * Maps 1:1 to `ContextMenu.Trigger`.
 */
export function ContextMenuTrigger(props: ContextMenuTriggerProps) {
  return <BaseContextMenu.Trigger {...props} />;
}
