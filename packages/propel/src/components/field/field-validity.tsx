import { Field as BaseField } from "@base-ui/react/field";

export type FieldValidityProps = BaseField.Validity.Props;

/**
 * Render-prop access to the field's `ValidityState` — Base UI's `Field.Validity` (renders no
 * element): `<FieldValidity>{(state) => …}</FieldValidity>` for fully custom validation UI beyond
 * `FieldError`.
 */
export function FieldValidity(props: FieldValidityProps) {
  return <BaseField.Validity {...props} />;
}
