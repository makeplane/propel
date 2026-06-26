import { NumberField as BaseNumberField } from "@base-ui/react/number-field";

import { type NumberFieldInputVariantProps, numberFieldInputVariants } from "./variants";

export type NumberFieldInputProps = Omit<BaseNumberField.Input.Props, "className" | "style"> &
  NumberFieldInputVariantProps;

export function NumberFieldInput({ magnitude, ...props }: NumberFieldInputProps) {
  return <BaseNumberField.Input className={numberFieldInputVariants({ magnitude })} {...props} />;
}
