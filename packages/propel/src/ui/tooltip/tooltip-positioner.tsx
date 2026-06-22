import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";

import { tooltipPositionerVariants } from "./variants";

/** Props for {@link TooltipPositioner}; 1:1 with Base UI `Tooltip.Positioner`. */
export type TooltipPositionerProps = Omit<BaseTooltip.Positioner.Props, "className" | "style">;

/** 1:1 wrapper around Base UI `Tooltip.Positioner`. */
export function TooltipPositioner(props: TooltipPositionerProps) {
  return <BaseTooltip.Positioner className={tooltipPositionerVariants()} {...props} />;
}
