import { Popover as BasePopover } from "@base-ui/react/popover";

import { popoverDescriptionVariants } from "./variants";

/** Props for {@link PopoverDescription}; 1:1 with Base UI `Popover.Description`. */
export type PopoverDescriptionProps = Omit<BasePopover.Description.Props, "className" | "style">;

/** 1:1 wrapper around Base UI `Popover.Description`. */
export function PopoverDescription(props: PopoverDescriptionProps) {
  return <BasePopover.Description className={popoverDescriptionVariants()} {...props} />;
}
