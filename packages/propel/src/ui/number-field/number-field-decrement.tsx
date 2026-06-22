import { NumberField as BaseNumberField } from "@base-ui/react/number-field";

import { numberFieldButtonVariants } from "./variants";

export type NumberFieldDecrementProps = Omit<
  BaseNumberField.Decrement.Props,
  "className" | "style"
>;

export function NumberFieldDecrement(props: NumberFieldDecrementProps) {
  return <BaseNumberField.Decrement className={numberFieldButtonVariants()} {...props} />;
}
