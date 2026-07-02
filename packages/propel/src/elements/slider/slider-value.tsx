import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { sliderValueVariants } from "./variants";

export type SliderValueProps = Omit<useRender.ComponentProps<"output">, "className" | "style">;

/**
 * The styled value readout. Base-UI-agnostic — graft in `components` via `<BaseSlider.Value
 * render={<SliderValue/>} />`.
 */
export function SliderValue({ render, ...props }: SliderValueProps) {
  const defaultProps: useRender.ElementProps<"output"> = { className: sliderValueVariants() };
  return useRender({ defaultTagName: "output", render, props: mergeProps(defaultProps, props) });
}
