import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";

export type ContextMenuGroupProps = Omit<BaseContextMenu.Group.Props, "className" | "style">;

/** Groups related items so a `ContextMenuGroupLabel` can title them. Wraps `ContextMenu.Group` 1:1. */
export function ContextMenuGroup(props: ContextMenuGroupProps) {
  return <BaseContextMenu.Group {...props} />;
}
