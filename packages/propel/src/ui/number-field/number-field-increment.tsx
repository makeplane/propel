import { NumberField as BaseNumberField } from "@base-ui/react/number-field";

import { type NumberFieldButtonVariantProps, numberFieldButtonVariants } from "./variants";

export type NumberFieldIncrementProps = Omit<
  BaseNumberField.Increment.Props,
  "className" | "style"
> &
  NumberFieldButtonVariantProps;

export function NumberFieldIncrement({ magnitude, ...props }: NumberFieldIncrementProps) {
  return (
    <BaseNumberField.Increment className={numberFieldButtonVariants({ magnitude })} {...props} />
  );
}
