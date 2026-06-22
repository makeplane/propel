import type * as React from "react";

import { FieldItem } from "../../ui/field/field-item";
import { FieldItemContent } from "../../ui/field/field-item-content";
import { useFieldOptionMagnitude } from "../../ui/field/use-field-option-magnitude";
import type { FieldMagnitude } from "../../ui/field/variants";
import { RadioFieldControl, type RadioFieldControlProps } from "./radio-field-control";

export type RadioGroupFieldOptionProps = RadioFieldControlProps & {
  /** Visible option label. */
  label: React.ReactNode;
  /** Optional supporting text announced as the radio description. */
  description?: React.ReactNode;
  /** Label and description size. Inherited from `RadioGroupField` when omitted. */
  magnitude?: FieldMagnitude;
};

/** A radio option row for use inside `RadioGroupField` or a custom `RadioGroup`. */
export function RadioGroupFieldOption({
  label,
  description,
  magnitude: magnitudeProp,
  ...props
}: RadioGroupFieldOptionProps) {
  const magnitude = useFieldOptionMagnitude(magnitudeProp);

  return (
    <FieldItem disabled={props.disabled}>
      <RadioFieldControl {...props} />
      <FieldItemContent magnitude={magnitude} description={description}>
        {label}
      </FieldItemContent>
    </FieldItem>
  );
}
