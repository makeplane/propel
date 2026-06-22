import { NumberField as BaseNumberField } from "@base-ui/react/number-field";

import { numberFieldGroupVariants } from "./variants";

export type NumberFieldGroupProps = Omit<BaseNumberField.Group.Props, "className" | "style">;

export function NumberFieldGroup(props: NumberFieldGroupProps) {
  return <BaseNumberField.Group className={numberFieldGroupVariants()} {...props} />;
}
