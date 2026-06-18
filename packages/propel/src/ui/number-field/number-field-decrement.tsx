import { NumberField as BaseNumberField } from "@base-ui/react/number-field";
import type * as React from "react";

import { numberFieldButtonVariants } from "./variants";

export type NumberFieldDecrementProps = Omit<
  React.ComponentProps<typeof BaseNumberField.Decrement>,
  "className" | "style"
>;

export function NumberFieldDecrement(props: NumberFieldDecrementProps) {
  return <BaseNumberField.Decrement className={numberFieldButtonVariants()} {...props} />;
}
