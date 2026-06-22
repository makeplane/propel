import type * as React from "react";

import type { CheckboxTone } from "../../ui/checkbox/index";
import {
  CheckboxFieldControl,
  type CheckboxFieldControlProps,
} from "../../ui/field/checkbox-field-control";
import { FieldItem } from "../../ui/field/field-item";
import { FieldItemContent } from "../../ui/field/field-item-content";
import { useFieldOptionMagnitude } from "../../ui/field/use-field-option-magnitude";
import type { FieldMagnitude } from "../../ui/field/variants";

export type CheckboxGroupFieldOptionProps = Omit<
  CheckboxFieldControlProps,
  "aria-label" | "label" | "inlineStartNode" | "tone"
> & {
  /** Visible option label. */
  label: React.ReactNode;
  /** Optional supporting text announced as the checkbox description. */
  description?: React.ReactNode;
  /** Label and description size. Inherited from `CheckboxGroupField` when omitted. */
  magnitude?: FieldMagnitude;
  /** Resting color of the box. */
  tone: CheckboxTone;
};

/** A checkbox option row for use inside `CheckboxGroupField` or a custom `CheckboxGroup`. */
export function CheckboxGroupFieldOption({
  label,
  description,
  magnitude: magnitudeProp,
  tone,
  ...props
}: CheckboxGroupFieldOptionProps) {
  const magnitude = useFieldOptionMagnitude(magnitudeProp);

  return (
    <FieldItem disabled={props.disabled}>
      <CheckboxFieldControl tone={tone} {...props} />
      <FieldItemContent magnitude={magnitude} description={description}>
        {label}
      </FieldItemContent>
    </FieldItem>
  );
}
