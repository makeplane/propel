import { NumberField as BaseNumberField } from "@base-ui/react/number-field";
import type * as React from "react";

import { numberFieldButtonVariants } from "./variants";

export type NumberFieldIncrementProps = Omit<
  React.ComponentProps<typeof BaseNumberField.Increment>,
  "className" | "style"
>;

export function NumberFieldIncrement(props: NumberFieldIncrementProps) {
  return <BaseNumberField.Increment className={numberFieldButtonVariants()} {...props} />;
}
