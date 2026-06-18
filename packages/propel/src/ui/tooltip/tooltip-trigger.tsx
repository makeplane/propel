import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import type * as React from "react";

/** Props for {@link TooltipTrigger}; 1:1 with Base UI `Tooltip.Trigger`. */
export type TooltipTriggerProps = Omit<
  React.ComponentProps<typeof BaseTooltip.Trigger>,
  "className" | "style"
>;

/** 1:1 wrapper around Base UI `Tooltip.Trigger`. */
export function TooltipTrigger(props: TooltipTriggerProps) {
  return <BaseTooltip.Trigger {...props} />;
}
