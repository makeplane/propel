import { Slider as BaseSlider } from "@base-ui/react/slider";

import { sliderIndicatorVariants } from "./variants";

export type SliderIndicatorProps = Omit<BaseSlider.Indicator.Props, "className" | "style">;

export function SliderIndicator(props: SliderIndicatorProps) {
  return <BaseSlider.Indicator className={sliderIndicatorVariants()} {...props} />;
}
