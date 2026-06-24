import { NumberField as BaseNumberField } from "@base-ui/react/number-field";

import { type NumberFieldMagnitude, numberFieldButtonVariants } from "./variants";

export type NumberFieldDecrementProps = Omit<
  BaseNumberField.Decrement.Props,
  "className" | "style"
> & {
  /**
   * Visual size of the stepper button. Required — pick the magnitude that matches the field's
   * density.
   */
  magnitude: NumberFieldMagnitude;
};

export function NumberFieldDecrement({ magnitude, ...props }: NumberFieldDecrementProps) {
  return (
    <BaseNumberField.Decrement className={numberFieldButtonVariants({ magnitude })} {...props} />
  );
}
