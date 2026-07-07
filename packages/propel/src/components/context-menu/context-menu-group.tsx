import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";

export type ContextMenuGroupProps = Omit<BaseContextMenu.Group.Props, "className" | "style">;

/** Groups related rows; provide `aria-label`/`aria-labelledby` when the group needs a name. */
export function ContextMenuGroup(props: ContextMenuGroupProps) {
  return <BaseContextMenu.Group {...props} />;
}
