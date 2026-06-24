import { NumberField as BaseNumberField } from "@base-ui/react/number-field";

import { type NumberFieldMagnitude, numberFieldButtonVariants } from "./variants";

export type NumberFieldIncrementProps = Omit<
  BaseNumberField.Increment.Props,
  "className" | "style"
> & {
  /**
   * Visual size of the stepper button. Required — pick the magnitude that matches the field's
   * density.
   */
  magnitude: NumberFieldMagnitude;
};

export function NumberFieldIncrement({ magnitude, ...props }: NumberFieldIncrementProps) {
  return (
    <BaseNumberField.Increment className={numberFieldButtonVariants({ magnitude })} {...props} />
  );
}
