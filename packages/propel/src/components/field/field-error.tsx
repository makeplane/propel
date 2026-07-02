import { Field as BaseField } from "@base-ui/react/field";

import { FieldError as FieldErrorElement } from "../../elements/field/field-error";
import { type FieldErrorVariantProps } from "../../elements/field/variants";

export type FieldErrorProps = Omit<BaseField.Error.Props, "className" | "style"> &
  FieldErrorVariantProps;

/**
 * Error text for a field: Base UI's `Field.Error` (shown per the control's validity / `match`)
 * grafted onto the styled `FieldError` element (rule 1a).
 */
export function FieldError({ magnitude, ...props }: FieldErrorProps) {
  return <BaseField.Error {...props} render={<FieldErrorElement magnitude={magnitude} />} />;
}
