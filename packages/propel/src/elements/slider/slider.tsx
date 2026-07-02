import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { sliderVariants } from "./variants";

export type SliderProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The styled slider root: stacks the (optional) header row over the control. Base-UI-agnostic —
 * graft the slider behavior in `components` via `<BaseSlider.Root render={<Slider/>} />`.
 */
export function Slider({ render, ...props }: SliderProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: sliderVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
