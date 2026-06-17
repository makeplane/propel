import { Field as BaseField } from "@base-ui/react/field";
import type * as React from "react";

export type FieldControlProps = React.ComponentProps<typeof BaseField.Control>;

/** Control slot for a custom field. Renders an `<input>` by default. */
export function FieldControl(props: FieldControlProps) {
  return <BaseField.Control {...props} />;
}
