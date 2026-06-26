import { NumberField as BaseNumberField } from "@base-ui/react/number-field";

import { type NumberFieldButtonVariantProps, numberFieldButtonVariants } from "./variants";

export type NumberFieldDecrementProps = Omit<
  BaseNumberField.Decrement.Props,
  "className" | "style"
> &
  NumberFieldButtonVariantProps;

export function NumberFieldDecrement({ magnitude, ...props }: NumberFieldDecrementProps) {
  return (
    <BaseNumberField.Decrement className={numberFieldButtonVariants({ magnitude })} {...props} />
  );
}
