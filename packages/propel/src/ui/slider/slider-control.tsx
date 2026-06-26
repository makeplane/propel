import { Slider as BaseSlider } from "@base-ui/react/slider";

import { type SliderControlVariantProps, sliderControlVariants } from "./variants";

export type { SliderMagnitude } from "./variants";

export type SliderControlProps = Omit<BaseSlider.Control.Props, "className" | "style"> &
  SliderControlVariantProps;

export function SliderControl({ magnitude, ...props }: SliderControlProps) {
  return <BaseSlider.Control className={sliderControlVariants({ magnitude })} {...props} />;
}
