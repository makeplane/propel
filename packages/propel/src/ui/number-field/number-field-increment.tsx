import { NumberField as BaseNumberField } from "@base-ui/react/number-field";

import { numberFieldButtonVariants } from "./variants";

export type NumberFieldIncrementProps = Omit<
  BaseNumberField.Increment.Props,
  "className" | "style"
>;

export function NumberFieldIncrement(props: NumberFieldIncrementProps) {
  return <BaseNumberField.Increment className={numberFieldButtonVariants()} {...props} />;
}
