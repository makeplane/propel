import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import type * as React from "react";

import { tooltipPopupVariants } from "./variants";

/** Props for {@link TooltipPopup}; 1:1 with Base UI `Tooltip.Popup`. */
export type TooltipPopupProps = Omit<
  React.ComponentProps<typeof BaseTooltip.Popup>,
  "className" | "style"
>;

/** 1:1 wrapper around Base UI `Tooltip.Popup`. */
export function TooltipPopup(props: TooltipPopupProps) {
  return <BaseTooltip.Popup className={tooltipPopupVariants()} {...props} />;
}
