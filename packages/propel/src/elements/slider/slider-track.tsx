import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { sliderTrackVariants } from "./variants";

export type SliderTrackProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The styled track bar the thumb travels along. Base-UI-agnostic — graft in `components` via
 * `<BaseSlider.Track render={<SliderTrack/>} />`.
 */
export function SliderTrack({ render, ...props }: SliderTrackProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: sliderTrackVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
