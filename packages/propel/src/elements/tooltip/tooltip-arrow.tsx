import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { tooltipArrowVariants } from "./variants";

export type TooltipArrowProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The styled tooltip caret — a rotated square clipped per `data-side` so it points back at the
 * trigger. Base-UI-agnostic; graft in `components` via `<BaseTooltip.Arrow render={<TooltipArrow/>}
 * />`.
 */
export function TooltipArrow({ render, ...props }: TooltipArrowProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: tooltipArrowVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
