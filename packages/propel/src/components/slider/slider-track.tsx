import { Slider as BaseSlider } from "@base-ui/react/slider";
import type * as React from "react";

import { sliderTrackVariants } from "./slider-styles";

export type SliderTrackProps = Omit<
  React.ComponentProps<typeof BaseSlider.Track>,
  "className" | "render" | "style"
>;

export function SliderTrack(props: SliderTrackProps) {
  return <BaseSlider.Track className={sliderTrackVariants()} {...props} />;
}
