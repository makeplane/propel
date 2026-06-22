import { Slider as BaseSlider } from "@base-ui/react/slider";

import { sliderControlVariants } from "./variants";

export type SliderControlProps = Omit<BaseSlider.Control.Props, "className" | "style">;

export function SliderControl(props: SliderControlProps) {
  return <BaseSlider.Control className={sliderControlVariants()} {...props} />;
}
