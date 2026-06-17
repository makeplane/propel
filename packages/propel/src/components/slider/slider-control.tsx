import { Slider as BaseSlider } from "@base-ui/react/slider";
import type * as React from "react";

import { sliderControlVariants } from "./slider-styles";

export type SliderControlProps = Omit<
  React.ComponentProps<typeof BaseSlider.Control>,
  "className" | "render" | "style"
>;

export function SliderControl(props: SliderControlProps) {
  return <BaseSlider.Control className={sliderControlVariants()} {...props} />;
}
