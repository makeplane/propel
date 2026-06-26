import { Slider as BaseSlider } from "@base-ui/react/slider";

import { type SliderThumbVariantProps, sliderThumbVariants } from "./variants";

export type SliderThumbProps = Omit<BaseSlider.Thumb.Props, "className" | "style"> &
  SliderThumbVariantProps;

export function SliderThumb({ magnitude, ...props }: SliderThumbProps) {
  return <BaseSlider.Thumb className={sliderThumbVariants({ magnitude })} {...props} />;
}
