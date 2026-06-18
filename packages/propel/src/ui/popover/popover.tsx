import { Popover as BasePopover } from "@base-ui/react/popover";
import type { PopoverRoot } from "@base-ui/react/popover";

export type PopoverProps<Payload = unknown> = Omit<
  PopoverRoot.Props<Payload>,
  "open" | "defaultOpen" | "onOpenChange" | "modal" | "children"
> & {
  /** Whether the popover is open. Controlled; pair with `onOpenChange`. */
  open?: boolean;
  /** Whether the popover is open on mount. Uncontrolled. @default false */
  defaultOpen?: boolean;
  /** Called with the next open state when the popover opens or closes. */
  onOpenChange?: PopoverRoot.Props<Payload>["onOpenChange"];
  /** Modal behavior while open. @default false */
  modal?: PopoverRoot.Props<Payload>["modal"];
  /** The popover's trigger and panel (`PopoverTrigger`, `PopoverContent`). */
  children?: PopoverRoot.Props<Payload>["children"];
};

export function Popover<Payload = unknown>(props: PopoverProps<Payload>) {
  return <BasePopover.Root {...props} />;
}
