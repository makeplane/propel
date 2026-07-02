import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { type SliderThumbVariantProps, sliderThumbVariants } from "./variants";

export type SliderThumbProps = Omit<useRender.ComponentProps<"div">, "className" | "style"> &
  SliderThumbVariantProps;

/**
 * The styled draggable thumb. Base-UI-agnostic — graft in `components` via `<BaseSlider.Thumb
 * render={<SliderThumb/>} />` (Base UI adds the nested range input).
 */
export function SliderThumb({ magnitude, render, ...props }: SliderThumbProps) {
  const defaultProps: useRender.ElementProps<"div"> = {
    className: sliderThumbVariants({ magnitude }),
  };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
