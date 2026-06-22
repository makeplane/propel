import { Slider as BaseSlider } from "@base-ui/react/slider";

import { sliderLabelVariants } from "./variants";

export type SliderLabelProps = Omit<BaseSlider.Label.Props, "className" | "style">;

export function SliderLabel(props: SliderLabelProps) {
  return <BaseSlider.Label className={sliderLabelVariants()} {...props} />;
}
