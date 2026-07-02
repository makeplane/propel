import type * as React from "react";

import type { FieldMagnitude } from "../../elements/field/variants";
import {
  CheckboxFieldControl,
  type CheckboxFieldControlProps,
} from "../../internal/checkbox-field-control";
import { useFieldOptionMagnitude } from "../../internal/field-option-magnitude";
import { FieldItem, FieldItemContent } from "../field";

export type CheckboxGroupFieldOptionProps = Omit<
  CheckboxFieldControlProps,
  "aria-label" | "label" | "icon"
> & {
  /** Visible option label. */
  label: React.ReactNode;
  /** Optional supporting text announced as the checkbox description. */
  description?: React.ReactNode;
  /** Label and description size. Inherited from `CheckboxGroupField` when omitted. */
  magnitude?: FieldMagnitude;
};

/** A checkbox option row for use inside `CheckboxGroupField` or a custom `CheckboxGroup`. */
export function CheckboxGroupFieldOption({
  label,
  description,
  magnitude: magnitudeProp,
  ...props
}: CheckboxGroupFieldOptionProps) {
  const magnitude = useFieldOptionMagnitude(magnitudeProp);

  return (
    <FieldItem disabled={props.disabled}>
      <CheckboxFieldControl {...props} />
      <FieldItemContent magnitude={magnitude} description={description}>
        {label}
      </FieldItemContent>
    </FieldItem>
  );
}
