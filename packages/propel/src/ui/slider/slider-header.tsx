import type * as React from "react";

import { sliderHeaderVariants } from "./variants";

export type SliderHeaderProps = Omit<React.ComponentPropsWithoutRef<"div">, "className" | "style">;

/**
 * The row above the control that holds the `SliderLabel` (inline-start) and the `SliderValue`
 * readout (inline-end). Keeps the label/value layout out of the root, which only stacks the header
 * over the control. Omit it when neither a label nor a value readout is shown.
 */
export function SliderHeader(props: SliderHeaderProps) {
  return <div className={sliderHeaderVariants()} {...props} />;
}
