import { NumberField as BaseNumberField } from "@base-ui/react/number-field";
import type * as React from "react";

import { numberFieldGroupVariants } from "./variants";

export type NumberFieldGroupProps = Omit<
  React.ComponentProps<typeof BaseNumberField.Group>,
  "className" | "style"
>;

export function NumberFieldGroup(props: NumberFieldGroupProps) {
  return <BaseNumberField.Group className={numberFieldGroupVariants()} {...props} />;
}
