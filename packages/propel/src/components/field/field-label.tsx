import { Field as BaseField } from "@base-ui/react/field";

import { FieldLabel as FieldLabelElement } from "../../elements/field/field-label";
import { FieldLabelRequiredMarker } from "../../elements/field/field-label-required-marker";
import { type FieldLabelVariantProps } from "../../elements/field/variants";

export type { FieldMagnitude } from "../../elements/field/variants";

export type FieldLabelProps = Omit<BaseField.Label.Props, "className" | "style"> &
  FieldLabelVariantProps & { required?: boolean };

/**
 * The ready-made field label: Base UI's `Field.Label` (auto-associated with the control) grafted
 * onto the styled `FieldLabel` element (rule 1a), plus a `FieldLabelRequiredMarker` when
 * `required`.
 */
export function FieldLabel({ magnitude, inset, required, children, ...props }: FieldLabelProps) {
  return (
    <BaseField.Label {...props} render={<FieldLabelElement magnitude={magnitude} inset={inset} />}>
      {children}
      {required ? <FieldLabelRequiredMarker>*</FieldLabelRequiredMarker> : null}
    </BaseField.Label>
  );
}
