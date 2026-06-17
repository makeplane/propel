import type * as React from "react";

import type { CheckboxTone } from "../checkbox/index";
import { CheckboxFieldControl, type CheckboxFieldControlProps } from "./checkbox-field-control";
import { FieldItem } from "./field-item";
import { FieldItemContent } from "./field-item-content";
import type { FieldMagnitude } from "./field-styles";
import { useFieldOptionMagnitude } from "./use-field-option-magnitude";

export type CheckboxGroupFieldOptionProps = Omit<
  CheckboxFieldControlProps,
  "aria-label" | "label" | "leadingIcon" | "tone"
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
