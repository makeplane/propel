import { NumberField as BaseNumberField } from "@base-ui/react/number-field";
import type * as React from "react";

import { numberFieldInputVariants } from "./number-field-styles";

export type NumberFieldInputProps = Omit<
  React.ComponentProps<typeof BaseNumberField.Input>,
  "className" | "render" | "style"
>;

export function NumberFieldInput(props: NumberFieldInputProps) {
  return <BaseNumberField.Input className={numberFieldInputVariants()} {...props} />;
}
