import { NumberField as BaseNumberField } from "@base-ui/react/number-field";
import type * as React from "react";

import { numberFieldRootVariants } from "./variants";

export type NumberFieldProps = Omit<
  React.ComponentProps<typeof BaseNumberField.Root>,
  "className" | "style"
>;

export function NumberField(props: NumberFieldProps) {
  return <BaseNumberField.Root className={numberFieldRootVariants()} {...props} />;
}
