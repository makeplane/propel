import { Popover as BasePopover } from "@base-ui/react/popover";
import type * as React from "react";

import { popoverBackdropVariants } from "./variants";

/** Props for {@link PopoverBackdrop}; 1:1 with Base UI `Popover.Backdrop`. */
export type PopoverBackdropProps = Omit<
  React.ComponentProps<typeof BasePopover.Backdrop>,
  "className" | "style"
>;

/** 1:1 wrapper around Base UI `Popover.Backdrop`. */
export function PopoverBackdrop(props: PopoverBackdropProps) {
  return <BasePopover.Backdrop className={popoverBackdropVariants()} {...props} />;
}
