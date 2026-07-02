import { Field as BaseField } from "@base-ui/react/field";

import { Field as FieldElement } from "../../elements/field/field";

export type FieldProps = Omit<BaseField.Root.Props, "className" | "style">;

/**
 * The shared field chrome for custom controls: Base UI's labeling/validation `Field.Root` behavior
 * grafted onto the styled `Field` element (rule 1a). Compose it with `FieldLabel`, a control,
 * `FieldDescription`, and `FieldError`.
 */
export function Field(props: FieldProps) {
  return <BaseField.Root {...props} render={<FieldElement />} />;
}
