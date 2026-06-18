import { Popover as BasePopover } from "@base-ui/react/popover";
import type * as React from "react";

import { popoverArrowVariants } from "./variants";

/** Props for {@link PopoverArrow}; 1:1 with Base UI `Popover.Arrow`. */
export type PopoverArrowProps = Omit<
  React.ComponentProps<typeof BasePopover.Arrow>,
  "className" | "style"
>;

/** 1:1 wrapper around Base UI `Popover.Arrow`. */
export function PopoverArrow(props: PopoverArrowProps) {
  return <BasePopover.Arrow className={popoverArrowVariants()} {...props} />;
}
