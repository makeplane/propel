import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";

import { tooltipArrowVariants } from "./variants";

/** Props for {@link TooltipArrow}; 1:1 with Base UI `Tooltip.Arrow`. */
export type TooltipArrowProps = Omit<BaseTooltip.Arrow.Props, "className" | "style">;

/** 1:1 wrapper around Base UI `Tooltip.Arrow`. Renders a rotated square clipped per `data-side`. */
export function TooltipArrow(props: TooltipArrowProps) {
  return <BaseTooltip.Arrow className={tooltipArrowVariants()} {...props} />;
}
