import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";

export type TooltipPortalProps = Omit<BaseTooltip.Portal.Props, "className" | "style">;

/** 1:1 wrapper around Base UI `Tooltip.Portal`. */
export function TooltipPortal(props: TooltipPortalProps) {
  return <BaseTooltip.Portal {...props} />;
}
