import { Field as BaseField } from "@base-ui/react/field";
import type * as React from "react";

export type FieldProps = React.ComponentProps<typeof BaseField.Root>;

/**
 * The shared field chrome for custom controls. Compose it with `FieldLabel`, `FieldControl`,
 * `FieldDescription`, and `FieldError`.
 */
export function Field(props: FieldProps) {
  return <BaseField.Root {...props} />;
}
