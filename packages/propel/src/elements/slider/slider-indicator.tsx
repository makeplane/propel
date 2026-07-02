import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { sliderIndicatorVariants } from "./variants";

export type SliderIndicatorProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The styled filled portion of the track. Base-UI-agnostic — graft in `components` via
 * `<BaseSlider.Indicator render={<SliderIndicator/>} />`.
 */
export function SliderIndicator({ render, ...props }: SliderIndicatorProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: sliderIndicatorVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
