import { Field as BaseField } from "@base-ui/react/field";
import type * as React from "react";

export type FieldErrorProps = React.ComponentProps<typeof BaseField.Error>;

/** Error text for a custom field. */
export function FieldError(props: FieldErrorProps) {
  return <BaseField.Error {...props} />;
}
