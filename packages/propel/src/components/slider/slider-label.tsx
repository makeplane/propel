import { Slider as BaseSlider } from "@base-ui/react/slider";
import type * as React from "react";

import { sliderLabelVariants } from "./slider-styles";

export type SliderLabelProps = Omit<
  React.ComponentProps<typeof BaseSlider.Label>,
  "className" | "render" | "style"
>;

export function SliderLabel(props: SliderLabelProps) {
  return <BaseSlider.Label className={sliderLabelVariants()} {...props} />;
}
