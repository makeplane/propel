import { Slider as BaseSlider } from "@base-ui/react/slider";
import type * as React from "react";

import { sliderIndicatorVariants } from "./slider-styles";

export type SliderIndicatorProps = Omit<
  React.ComponentProps<typeof BaseSlider.Indicator>,
  "className" | "render" | "style"
>;

export function SliderIndicator(props: SliderIndicatorProps) {
  return <BaseSlider.Indicator className={sliderIndicatorVariants()} {...props} />;
}
