import { Popover as BasePopover } from "@base-ui/react/popover";
import type * as React from "react";

type BasePopoverRootProps = React.ComponentProps<typeof BasePopover.Root>;

export type PopoverProps = Omit<
  BasePopoverRootProps,
  "open" | "defaultOpen" | "onOpenChange" | "modal" | "children"
> & {
  /** Whether the popover is open. Controlled; pair with `onOpenChange`. */
  open?: boolean;
  /** Whether the popover is open on mount. Uncontrolled. @default false */
  defaultOpen?: boolean;
  /** Called with the next open state when the popover opens or closes. */
  onOpenChange?: BasePopoverRootProps["onOpenChange"];
  /** Modal behavior while open. @default false */
  modal?: BasePopoverRootProps["modal"];
  /** The popover's trigger and panel (`PopoverTrigger`, `PopoverContent`). */
  children?: React.ReactNode;
};

export function Popover(props: PopoverProps) {
  return <BasePopover.Root {...props} />;
}
