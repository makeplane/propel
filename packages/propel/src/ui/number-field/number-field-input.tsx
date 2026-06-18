import { NumberField as BaseNumberField } from "@base-ui/react/number-field";
import type * as React from "react";

import { numberFieldInputVariants } from "./variants";

export type NumberFieldInputProps = Omit<
  React.ComponentProps<typeof BaseNumberField.Input>,
  "className" | "style"
>;

export function NumberFieldInput(props: NumberFieldInputProps) {
  return <BaseNumberField.Input className={numberFieldInputVariants()} {...props} />;
}
