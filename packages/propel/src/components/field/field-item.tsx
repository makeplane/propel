import { Field as BaseField } from "@base-ui/react/field";

import { FieldItem as FieldItemElement } from "../../elements/field/field-item";

export type FieldItemProps = Omit<BaseField.Item.Props, "className" | "style">;

/**
 * Groups one checkbox or radio option with its label and optional description: Base UI's
 * `Field.Item` behavior grafted onto the styled `FieldItem` element (rule 1a).
 */
export function FieldItem(props: FieldItemProps) {
  return <BaseField.Item {...props} render={<FieldItemElement />} />;
}
