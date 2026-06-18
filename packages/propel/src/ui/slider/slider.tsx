import { Slider as BaseSlider } from "@base-ui/react/slider";

import { sliderVariants } from "./variants";

export type SliderProps<Value extends number | readonly number[] = number | readonly number[]> =
  Omit<BaseSlider.Root.Props<Value>, "className" | "style">;

export function Slider<Value extends number | readonly number[] = number | readonly number[]>(
  props: SliderProps<Value>,
) {
  return <BaseSlider.Root className={sliderVariants()} {...props} />;
}
