import { Popover as BasePopover } from "@base-ui/react/popover";
import type * as React from "react";

import { popoverCloseVariants } from "./variants";

/** Props for {@link PopoverClose}; 1:1 with Base UI `Popover.Close`. */
export type PopoverCloseProps = Omit<
  React.ComponentProps<typeof BasePopover.Close>,
  "className" | "style"
>;

/** 1:1 wrapper around Base UI `Popover.Close`. */
export function PopoverClose(props: PopoverCloseProps) {
  return <BasePopover.Close className={popoverCloseVariants()} {...props} />;
}
