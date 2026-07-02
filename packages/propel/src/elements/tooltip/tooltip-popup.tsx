import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { tooltipPopupVariants } from "./variants";

export type TooltipPopupProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The styled tooltip surface — an inverse-adaptive popup with caption text, radius, shadow, and the
 * gap to the shortcut. Base-UI-agnostic; graft in `components` via `<BaseTooltip.Popup
 * render={<TooltipPopup/>} />`.
 */
export function TooltipPopup({ render, ...props }: TooltipPopupProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: tooltipPopupVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
