import {
  FieldLabel as FieldLabelElement,
  type FieldLabelProps as FieldLabelElementProps,
} from "../../ui/field/field-label";
import { FieldLabelRequiredMarker } from "../../ui/field/field-label-required-marker";

export type FieldLabelProps = FieldLabelElementProps & { required?: boolean };

/**
 * The ready-made field label: the `FieldLabel` slot, plus a `FieldLabelRequiredMarker` when
 * `required`.
 */
export function FieldLabel({ required, children, ...props }: FieldLabelProps) {
  return (
    <FieldLabelElement {...props}>
      {children}
      {required ? <FieldLabelRequiredMarker>*</FieldLabelRequiredMarker> : null}
    </FieldLabelElement>
  );
}
