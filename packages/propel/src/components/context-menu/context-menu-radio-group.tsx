import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";

export type ContextMenuRadioGroupProps = Omit<
  BaseContextMenu.RadioGroup.Props,
  "className" | "style"
>;

/** Wraps `ContextMenuRadioItem`s sharing one `value` — Base UI's radio-group state, no chrome. */
export function ContextMenuRadioGroup(props: ContextMenuRadioGroupProps) {
  return <BaseContextMenu.RadioGroup {...props} />;
}
