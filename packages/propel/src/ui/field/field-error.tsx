import { Field as BaseField } from "@base-ui/react/field";

import { fieldErrorVariants, type InputMagnitude } from "./variants";

export type FieldErrorProps = Omit<BaseField.Error.Props, "className" | "style"> & {
  /** Text size matched to the field control. */
  magnitude: InputMagnitude;
};

/** Error text for a custom field. */
export function FieldError({ magnitude, ...props }: FieldErrorProps) {
  return <BaseField.Error className={fieldErrorVariants({ magnitude })} {...props} />;
}
