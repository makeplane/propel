import { Slider as BaseSlider } from "@base-ui/react/slider";
import type * as React from "react";

import { sliderControlVariants } from "./variants";

export type SliderControlProps = Omit<
  React.ComponentProps<typeof BaseSlider.Control>,
  "className" | "style"
>;

export function SliderControl(props: SliderControlProps) {
  return <BaseSlider.Control className={sliderControlVariants()} {...props} />;
}
