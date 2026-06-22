import { Slider as BaseSlider } from "@base-ui/react/slider";

import { sliderTrackVariants } from "./variants";

export type SliderTrackProps = Omit<BaseSlider.Track.Props, "className" | "style">;

export function SliderTrack(props: SliderTrackProps) {
  return <BaseSlider.Track className={sliderTrackVariants()} {...props} />;
}
