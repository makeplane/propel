import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";

export type ContextMenuRadioGroupProps = Omit<
  BaseContextMenu.RadioGroup.Props,
  "className" | "style"
>;

/** Groups related radio items around a shared value. Wraps `ContextMenu.RadioGroup` 1:1. */
export function ContextMenuRadioGroup(props: ContextMenuRadioGroupProps) {
  return <BaseContextMenu.RadioGroup {...props} />;
}
