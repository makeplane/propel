import { Field as BaseField } from "@base-ui/react/field";
import type * as React from "react";

import { fieldDescriptionVariants, type InputMagnitude } from "./field-styles";

export type FieldDescriptionProps = Omit<
  React.ComponentProps<typeof BaseField.Description>,
  "className" | "render" | "style"
> & {
  /** Text size matched to the field control. */
  magnitude: InputMagnitude;
};

/** Supporting / helper text for a custom field. */
export function FieldDescription({ magnitude, ...props }: FieldDescriptionProps) {
  return <BaseField.Description className={fieldDescriptionVariants({ magnitude })} {...props} />;
}
