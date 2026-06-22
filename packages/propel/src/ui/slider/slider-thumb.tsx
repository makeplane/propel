import { Slider as BaseSlider } from "@base-ui/react/slider";

import { sliderThumbVariants } from "./variants";

export type SliderThumbProps = Omit<BaseSlider.Thumb.Props, "className" | "style">;

export function SliderThumb(props: SliderThumbProps) {
  return <BaseSlider.Thumb className={sliderThumbVariants()} {...props} />;
}
