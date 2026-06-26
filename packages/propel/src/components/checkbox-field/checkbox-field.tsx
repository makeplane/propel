import type * as React from "react";

import {
  CheckboxFieldControl,
  type CheckboxFieldControlProps,
} from "../../internal/checkbox-field-control";
import { Field } from "../../ui/field/field";
import { FieldItem } from "../../ui/field/field-item";
import type { FieldMagnitude } from "../../ui/field/variants";
import { FieldItemContent } from "../field";
import { FieldHelperText } from "../field/field-helper-text";

export type CheckboxFieldProps = Omit<
  CheckboxFieldControlProps,
  "aria-label" | "label" | "inlineStartNode"
> & {
  /** Helper text shown below the control. Replaced by `error` when an error is set. */
  hint?: React.ReactNode;
  /** Error text shown below the control. */
  error?: React.ReactNode;
  /** Visible field label. */
  label: React.ReactNode;
  /** Label and helper text size. */
  magnitude: FieldMagnitude;
  /** Optional supporting text announced as the checkbox description. */
  description?: React.ReactNode;
};

/** Ready-to-use single checkbox field with label, description, and helper/error text. */
export function CheckboxField({
  label,
  description,
  hint,
  error,
  magnitude,
  name,
  disabled,
  ...controlProps
}: CheckboxFieldProps) {
  return (
    <Field name={name} disabled={disabled} invalid={error != null || undefined}>
      <FieldItem disabled={disabled}>
        <CheckboxFieldControl disabled={disabled} {...controlProps} />
        <FieldItemContent magnitude={magnitude} description={description}>
          {label}
        </FieldItemContent>
      </FieldItem>
      <FieldHelperText magnitude={magnitude} hint={hint} error={error} />
    </Field>
  );
}
