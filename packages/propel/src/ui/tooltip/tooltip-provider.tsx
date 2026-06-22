import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import type * as React from "react";

type BaseTooltipProviderProps = BaseTooltip.Provider.Props;

export type TooltipProviderProps = Omit<
  BaseTooltipProviderProps,
  "delay" | "closeDelay" | "children"
> & {
  /** How long to wait before opening a tooltip, in milliseconds. */
  delay?: number;
  /** How long to wait before closing a tooltip, in milliseconds. */
  closeDelay?: number;
  /** The subtree whose tooltips share this group's open/close timing. */
  children?: React.ReactNode;
};

/**
 * Shares one open/close delay across every tooltip beneath it, so moving between nearby triggers
 * can show adjacent tooltips immediately.
 */
export function TooltipProvider(props: TooltipProviderProps) {
  return <BaseTooltip.Provider {...props} />;
}
