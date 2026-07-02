import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type SliderControlVariantProps, sliderControlVariants } from "./variants";

export type { SliderMagnitude } from "./variants";

export type SliderControlProps = Omit<useRender.ComponentProps<"div">, "className" | "style"> &
  SliderControlVariantProps;

/**
 * The styled control row that holds the track. Base-UI-agnostic — graft in `components` via
 * `<BaseSlider.Control render={<SliderControl/>} />`.
 */
export function SliderControl({ magnitude, render, ...props }: SliderControlProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: sliderControlVariants({ magnitude }),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
