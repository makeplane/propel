import { Field as BaseField } from "@base-ui/react/field";

import { FieldDescription as FieldDescriptionElement } from "../../elements/field/field-description";
import { type FieldDescriptionVariantProps } from "../../elements/field/variants";

export type FieldDescriptionProps = Omit<BaseField.Description.Props, "className" | "style"> &
  FieldDescriptionVariantProps;

/**
 * Supporting / helper text for a field: Base UI's `Field.Description` (auto-associated as the
 * control's accessible description) grafted onto the styled `FieldDescription` element (rule 1a).
 */
export function FieldDescription({ magnitude, ...props }: FieldDescriptionProps) {
  return (
    <BaseField.Description {...props} render={<FieldDescriptionElement magnitude={magnitude} />} />
  );
}
