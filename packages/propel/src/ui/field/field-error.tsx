import { Field as BaseField } from "@base-ui/react/field";

import { type FieldErrorVariantProps, fieldErrorVariants } from "./variants";


export type FieldErrorProps = Omit<BaseField.Error.Props, "className" | "style"> &
  FieldErrorVariantProps;

/** Error text for a custom field. */
export function FieldError({ magnitude, ...props }: FieldErrorProps) {
  return <BaseField.Error className={fieldErrorVariants({ magnitude })} {...props} />;
}
