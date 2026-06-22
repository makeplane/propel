import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";

import { tooltipViewportVariants } from "./variants";

/** Props for {@link TooltipViewport}; 1:1 with Base UI `Tooltip.Viewport`. */
export type TooltipViewportProps = Omit<BaseTooltip.Viewport.Props, "className" | "style">;

/** 1:1 wrapper around Base UI `Tooltip.Viewport`. */
export function TooltipViewport(props: TooltipViewportProps) {
  return <BaseTooltip.Viewport className={tooltipViewportVariants()} {...props} />;
}
