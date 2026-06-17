import { Popover as BasePopover } from "@base-ui/react/popover";
import type * as React from "react";

export type PopoverTriggerProps = Omit<
  React.ComponentProps<typeof BasePopover.Trigger>,
  "className" | "style"
>;

/**
 * The element that opens the popover. Renders a `<button>` by default; pass `render` to project the
 * trigger onto your own element.
 */
export function PopoverTrigger(props: PopoverTriggerProps) {
  return <BasePopover.Trigger {...props} />;
}
