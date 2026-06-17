import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import type { VariantProps } from "class-variance-authority";
import type * as React from "react";

import { radioGroupVariants } from "./radio-styles";

export type RadioGroupDensity = NonNullable<VariantProps<typeof radioGroupVariants>["density"]>;

export type RadioGroupProps = Omit<
  React.ComponentProps<typeof BaseRadioGroup>,
  "className" | "render" | "style"
> & {
  /** Spacing between options: `comfortable` (default, 8px) or `compact` (flush). */
  density?: RadioGroupDensity;
};

/** Groups a set of `Radio` options so at most one can be selected at a time. Renders a `radiogroup`. */
export function RadioGroup({ density = "comfortable", ...props }: RadioGroupProps) {
  return <BaseRadioGroup className={radioGroupVariants({ density })} {...props} />;
}
