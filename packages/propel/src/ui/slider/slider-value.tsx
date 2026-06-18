import { Slider as BaseSlider } from "@base-ui/react/slider";
import type * as React from "react";

import { sliderValueVariants } from "./variants";

export type SliderValueProps = Omit<
  React.ComponentProps<typeof BaseSlider.Value>,
  "className" | "style"
>;

export function SliderValue(props: SliderValueProps) {
  return <BaseSlider.Value className={sliderValueVariants()} {...props} />;
}
