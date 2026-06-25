import type * as React from "react";

import { useFieldOptionMagnitude } from "../../internal/field-option-magnitude";
import { FieldItem } from "../../ui/field/field-item";
import { FieldItemContent } from "../../ui/field/field-item-content";
import type { FieldMagnitude } from "../../ui/field/variants";
import { Radio, type RadioProps } from "../radio/radio";

export type RadioGroupFieldOptionProps = RadioProps & {
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
      <Radio {...props} />
      <FieldItemContent magnitude={magnitude} description={description}>
        {label}
      </FieldItemContent>
    </FieldItem>
  );
}
