import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";

export type ContextMenuGroupProps = Omit<BaseContextMenu.Group.Props, "className" | "style">;

/** Groups related rows so a `ContextMenuGroupLabel` names them for assistive tech. */
export function ContextMenuGroup(props: ContextMenuGroupProps) {
  return <BaseContextMenu.Group {...props} />;
}
