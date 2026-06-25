import { Popover as BasePopover } from "@base-ui/react/popover";

export type PopoverPortalProps = Omit<BasePopover.Portal.Props, "className" | "style">;

/** 1:1 wrapper around Base UI `Popover.Portal`. */
export function PopoverPortal(props: PopoverPortalProps) {
  return <BasePopover.Portal {...props} />;
}
