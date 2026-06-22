import { Popover as BasePopover } from "@base-ui/react/popover";

import { popoverViewportVariants } from "./variants";

/** Props for {@link PopoverViewport}; 1:1 with Base UI `Popover.Viewport`. */
export type PopoverViewportProps = Omit<BasePopover.Viewport.Props, "className" | "style">;

/** 1:1 wrapper around Base UI `Popover.Viewport`. */
export function PopoverViewport(props: PopoverViewportProps) {
  return <BasePopover.Viewport className={popoverViewportVariants()} {...props} />;
}
