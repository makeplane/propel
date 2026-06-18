import { Popover as BasePopover } from "@base-ui/react/popover";
import type * as React from "react";

import { popoverViewportVariants } from "./variants";

/** Props for {@link PopoverViewport}; 1:1 with Base UI `Popover.Viewport`. */
export type PopoverViewportProps = Omit<
  React.ComponentProps<typeof BasePopover.Viewport>,
  "className" | "style"
>;

/** 1:1 wrapper around Base UI `Popover.Viewport`. */
export function PopoverViewport(props: PopoverViewportProps) {
  return <BasePopover.Viewport className={popoverViewportVariants()} {...props} />;
}
