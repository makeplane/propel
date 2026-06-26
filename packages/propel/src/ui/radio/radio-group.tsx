import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import type { RadioGroup as BaseRadioGroupTypes } from "@base-ui/react/radio-group";

import { type RadioGroupVariantProps, radioGroupVariants } from "./variants";

export type { RadioGroupDensity } from "./variants";

// Mirror `BaseRadioGroup`'s own `Value` generic (default `any`); the typed/safe variant is the
// components-tier `RadioGroupField`.
export type RadioGroupProps<Value = any> = Omit<
  BaseRadioGroupTypes.Props<Value>,
  "className" | "style"
> &
  RadioGroupVariantProps;

/** Groups a set of `Radio` options so at most one can be selected at a time. Renders a `radiogroup`. */
export function RadioGroup<Value = any>({ density, ...props }: RadioGroupProps<Value>) {
  return <BaseRadioGroup className={radioGroupVariants({ density })} {...props} />;
}
