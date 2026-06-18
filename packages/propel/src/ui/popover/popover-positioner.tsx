import { Popover as BasePopover } from "@base-ui/react/popover";
import type * as React from "react";

import { popoverPositionerVariants } from "./variants";

/** Props for {@link PopoverPositioner}; 1:1 with Base UI `Popover.Positioner`. */
export type PopoverPositionerProps = Omit<
  React.ComponentProps<typeof BasePopover.Positioner>,
  "className" | "style"
>;

/** 1:1 wrapper around Base UI `Popover.Positioner`. */
export function PopoverPositioner(props: PopoverPositionerProps) {
  return <BasePopover.Positioner className={popoverPositionerVariants()} {...props} />;
}
