import { Popover as BasePopover } from "@base-ui/react/popover";

export type PopoverTriggerProps = Omit<BasePopover.Trigger.Props, "className" | "style">;

/**
 * The element that opens the popover. Renders a `<button>` by default; pass `render` to project the
 * trigger onto your own element.
 */
export function PopoverTrigger(props: PopoverTriggerProps) {
  return <BasePopover.Trigger {...props} />;
}
