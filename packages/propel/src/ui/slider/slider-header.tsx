import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";

import { sliderHeaderVariants } from "./variants";

export type SliderHeaderProps = Omit<useRender.ComponentProps<"div">, "className" | "style">;

/**
 * The row above the control that holds the `SliderLabel` (inline-start) and the `SliderValue`
 * readout (inline-end). Keeps the label/value layout out of the root, which only stacks the header
 * over the control. Omit it when neither a label nor a value readout is shown.
 */
export function SliderHeader({ render, ...props }: SliderHeaderProps) {
  const defaultProps: useRender.ElementProps<"div"> = { className: sliderHeaderVariants() };
  return useRender({ defaultTagName: "div", render, props: mergeProps(defaultProps, props) });
}
