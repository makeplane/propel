import { NumberField as BaseNumberField } from "@base-ui/react/number-field";
import type * as React from "react";

import { numberFieldGroupVariants } from "./number-field-styles";

export type NumberFieldGroupProps = Omit<
  React.ComponentProps<typeof BaseNumberField.Group>,
  "className" | "render" | "style"
>;

export function NumberFieldGroup(props: NumberFieldGroupProps) {
  return <BaseNumberField.Group className={numberFieldGroupVariants()} {...props} />;
}
