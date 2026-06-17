import { NumberField as BaseNumberField } from "@base-ui/react/number-field";
import type * as React from "react";

import { numberFieldRootVariants } from "./number-field-styles";

export type NumberFieldProps = Omit<
  React.ComponentProps<typeof BaseNumberField.Root>,
  "className" | "render" | "style"
>;

export function NumberField(props: NumberFieldProps) {
  return <BaseNumberField.Root className={numberFieldRootVariants()} {...props} />;
}
