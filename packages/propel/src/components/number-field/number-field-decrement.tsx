import { NumberField as BaseNumberField } from "@base-ui/react/number-field";
import type * as React from "react";

import { numberFieldButtonVariants } from "./number-field-styles";

export type NumberFieldDecrementProps = Omit<
  React.ComponentProps<typeof BaseNumberField.Decrement>,
  "className" | "render" | "style"
>;

export function NumberFieldDecrement(props: NumberFieldDecrementProps) {
  return <BaseNumberField.Decrement className={numberFieldButtonVariants()} {...props} />;
}
