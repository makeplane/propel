import { Slider as BaseSlider } from "@base-ui/react/slider";
import type * as React from "react";

import { sliderThumbVariants } from "./variants";

export type SliderThumbProps = Omit<
  React.ComponentProps<typeof BaseSlider.Thumb>,
  "className" | "style"
>;

export function SliderThumb(props: SliderThumbProps) {
  return <BaseSlider.Thumb className={sliderThumbVariants()} {...props} />;
}
