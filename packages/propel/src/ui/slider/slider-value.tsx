import { Slider as BaseSlider } from "@base-ui/react/slider";

import { sliderValueVariants } from "./variants";

export type SliderValueProps = Omit<BaseSlider.Value.Props, "className" | "style">;

export function SliderValue(props: SliderValueProps) {
  return <BaseSlider.Value className={sliderValueVariants()} {...props} />;
}
