import { Popover as BasePopover } from "@base-ui/react/popover";
import type * as React from "react";

import { popoverTitleVariants } from "./variants";

/** Props for {@link PopoverTitle}; 1:1 with Base UI `Popover.Title`. */
export type PopoverTitleProps = Omit<
  React.ComponentProps<typeof BasePopover.Title>,
  "className" | "style"
>;

/** 1:1 wrapper around Base UI `Popover.Title`. */
export function PopoverTitle(props: PopoverTitleProps) {
  return <BasePopover.Title className={popoverTitleVariants()} {...props} />;
}
