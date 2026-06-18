import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import type * as React from "react";

import { tooltipViewportVariants } from "./variants";

/** Props for {@link TooltipViewport}; 1:1 with Base UI `Tooltip.Viewport`. */
export type TooltipViewportProps = Omit<
  React.ComponentProps<typeof BaseTooltip.Viewport>,
  "className" | "style"
>;

/** 1:1 wrapper around Base UI `Tooltip.Viewport`. */
export function TooltipViewport(props: TooltipViewportProps) {
  return <BaseTooltip.Viewport className={tooltipViewportVariants()} {...props} />;
}
