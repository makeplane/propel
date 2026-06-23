import { NumberField as BaseNumberField } from "@base-ui/react/number-field";

import { type NumberFieldMagnitude, numberFieldInputVariants } from "./variants";

export type NumberFieldInputProps = Omit<BaseNumberField.Input.Props, "className" | "style"> & {
  /** Visual size of the input. Required — must match the stepper buttons' magnitude. */
  magnitude: NumberFieldMagnitude;
};

export function NumberFieldInput({ magnitude, ...props }: NumberFieldInputProps) {
  return <BaseNumberField.Input className={numberFieldInputVariants({ magnitude })} {...props} />;
}
