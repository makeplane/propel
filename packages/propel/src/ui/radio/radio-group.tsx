import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import type { RadioGroup as BaseRadioGroupTypes } from "@base-ui/react/radio-group";
import type { VariantProps } from "class-variance-authority";

import { radioGroupVariants } from "./variants";

export type RadioGroupDensity = NonNullable<VariantProps<typeof radioGroupVariants>["density"]>;

export type RadioGroupProps<Value = string> = Omit<
  BaseRadioGroupTypes.Props<Value>,
  "className" | "style"
> & {
  /** Spacing between options: `comfortable` (8px) or `compact` (flush). */
  density: RadioGroupDensity;
};

/** Groups a set of `Radio` options so at most one can be selected at a time. Renders a `radiogroup`. */
export function RadioGroup<Value = string>({ density, ...props }: RadioGroupProps<Value>) {
  return <BaseRadioGroup className={radioGroupVariants({ density })} {...props} />;
}
