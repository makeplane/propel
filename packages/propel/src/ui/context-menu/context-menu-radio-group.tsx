import { ContextMenu as BaseContextMenu } from "@base-ui/react/context-menu";
import type * as React from "react";

export type ContextMenuRadioGroupProps = Omit<
  React.ComponentProps<typeof BaseContextMenu.RadioGroup>,
  "className" | "style"
>;

/** Groups related radio items around a shared value. Wraps `ContextMenu.RadioGroup` 1:1. */
export function ContextMenuRadioGroup(props: ContextMenuRadioGroupProps) {
  return <BaseContextMenu.RadioGroup {...props} />;
}
