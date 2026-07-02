import { RadioGroup as BaseRadioGroup } from "@base-ui/react/radio-group";
import type { RadioGroup as BaseRadioGroupTypes } from "@base-ui/react/radio-group";

import { RadioGroup as RadioGroupElement, type RadioGroupDensity } from "../../elements/radio";

export type { RadioGroupDensity } from "../../elements/radio";

// Mirror `BaseRadioGroup`'s own `Value` generic (default `any`); the typed/safe variant is the
// components-tier `RadioGroupField`.
export type RadioGroupProps<Value = any> = Omit<
  BaseRadioGroupTypes.Props<Value>,
  "className" | "style"
> & {
  /** Spacing between radio options. */
  density: RadioGroupDensity;
};

/**
 * Groups a set of `Radio` options so at most one can be selected at a time. Grafts Base UI's
 * radio-group behavior (single-select state + roving focus) onto the styled `RadioGroup` frame,
 * which owns the required row-spacing `density`.
 */
export function RadioGroup<Value = any>({ density, ...props }: RadioGroupProps<Value>) {
  return <BaseRadioGroup render={<RadioGroupElement density={density} />} {...props} />;
}
