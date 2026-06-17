import { Slider as BaseSlider } from "@base-ui/react/slider";
import type * as React from "react";

import { sliderValueVariants } from "./slider-styles";

export type SliderValueProps = Omit<
  React.ComponentProps<typeof BaseSlider.Value>,
  "className" | "render" | "style"
>;

export function SliderValue(props: SliderValueProps) {
  return <BaseSlider.Value className={sliderValueVariants()} {...props} />;
}
