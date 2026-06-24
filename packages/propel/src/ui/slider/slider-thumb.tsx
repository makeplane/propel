import { Slider as BaseSlider } from "@base-ui/react/slider";

import { type SliderMagnitude } from "./slider-control";
import { sliderThumbVariants } from "./variants";

export type SliderThumbProps = Omit<BaseSlider.Thumb.Props, "className" | "style"> & {
  /** Thumb size. Must match the parent `SliderControl`'s `magnitude`. */
  magnitude: SliderMagnitude;
};

export function SliderThumb({ magnitude, ...props }: SliderThumbProps) {
  return <BaseSlider.Thumb className={sliderThumbVariants({ magnitude })} {...props} />;
}
