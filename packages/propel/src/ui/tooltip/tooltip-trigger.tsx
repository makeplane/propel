import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";

/** Props for {@link TooltipTrigger}; 1:1 with Base UI `Tooltip.Trigger`. */
export type TooltipTriggerProps = Omit<BaseTooltip.Trigger.Props, "className" | "style">;

/** 1:1 wrapper around Base UI `Tooltip.Trigger`. */
export function TooltipTrigger(props: TooltipTriggerProps) {
  return <BaseTooltip.Trigger {...props} />;
}
