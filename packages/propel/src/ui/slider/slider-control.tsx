import { Slider as BaseSlider } from "@base-ui/react/slider";
import { type VariantProps } from "class-variance-authority";

import { sliderControlVariants } from "./variants";

export type SliderMagnitude = NonNullable<VariantProps<typeof sliderControlVariants>["magnitude"]>;

export type SliderControlProps = Omit<BaseSlider.Control.Props, "className" | "style"> & {
  /** Track hit-area height, scaled to match the thumb size. Must match the thumb's `magnitude`. */
  magnitude: SliderMagnitude;
};

export function SliderControl({ magnitude, ...props }: SliderControlProps) {
  return <BaseSlider.Control className={sliderControlVariants({ magnitude })} {...props} />;
}
