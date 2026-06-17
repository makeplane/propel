import { Field as BaseField } from "@base-ui/react/field";
import type * as React from "react";

export type FieldDescriptionProps = React.ComponentProps<typeof BaseField.Description>;

/** Supporting / helper text for a custom field. */
export function FieldDescription(props: FieldDescriptionProps) {
  return <BaseField.Description {...props} />;
}
