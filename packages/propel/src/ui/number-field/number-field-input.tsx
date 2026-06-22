import { NumberField as BaseNumberField } from "@base-ui/react/number-field";

import { numberFieldInputVariants } from "./variants";

export type NumberFieldInputProps = Omit<BaseNumberField.Input.Props, "className" | "style">;

export function NumberFieldInput(props: NumberFieldInputProps) {
  return <BaseNumberField.Input className={numberFieldInputVariants()} {...props} />;
}
