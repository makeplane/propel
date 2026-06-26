import { NumberField as BaseNumberField } from "@base-ui/react/number-field";

import { numberFieldVariants } from "./variants";

export type NumberFieldProps = Omit<BaseNumberField.Root.Props, "className" | "style">;

export function NumberField(props: NumberFieldProps) {
  return <BaseNumberField.Root className={numberFieldVariants()} {...props} />;
}
