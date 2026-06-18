import { Popover as BasePopover } from "@base-ui/react/popover";
import type * as React from "react";

import { popoverPopupVariants } from "./variants";

/** Props for {@link PopoverPopup}; 1:1 with Base UI `Popover.Popup`. */
export type PopoverPopupProps = Omit<
  React.ComponentProps<typeof BasePopover.Popup>,
  "className" | "style"
>;

/** 1:1 wrapper around Base UI `Popover.Popup`. */
export function PopoverPopup(props: PopoverPopupProps) {
  return <BasePopover.Popup className={popoverPopupVariants()} {...props} />;
}
