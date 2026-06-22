import { Field as BaseField } from "@base-ui/react/field";

import { fieldDescriptionVariants, type InputMagnitude } from "./variants";

export type FieldDescriptionProps = Omit<BaseField.Description.Props, "className" | "style"> & {
  /** Text size matched to the field control. */
  magnitude: InputMagnitude;
};

/** Supporting / helper text for a custom field. */
export function FieldDescription({ magnitude, ...props }: FieldDescriptionProps) {
  return <BaseField.Description className={fieldDescriptionVariants({ magnitude })} {...props} />;
}
