import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { sliderLabelVariants } from "./variants";

export type SliderLabelProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The styled slider label. Base-UI-agnostic — graft in `components` via `<BaseSlider.Label
 * render={<SliderLabel/>} />`.
 */
export function SliderLabel({ render, ...props }: SliderLabelProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: sliderLabelVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
