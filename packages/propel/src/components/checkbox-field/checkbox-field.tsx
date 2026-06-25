import type * as React from "react";

import type { CheckboxTone } from "../../ui/checkbox/index";
import {
  CheckboxFieldControl,
  type CheckboxFieldControlProps,
} from "../../ui/field/checkbox-field-control";
import { Field } from "../../ui/field/field";
import { FieldItem } from "../../ui/field/field-item";
import { FieldItemContent } from "../../ui/field/field-item-content";
import type { FieldMagnitude } from "../../ui/field/variants";
import { FieldHelperText } from "../field/field-helper-text";

export type CheckboxFieldProps = Omit<
  CheckboxFieldControlProps,
  "aria-label" | "label" | "inlineStartNode" | "tone"
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
  /** Resting color of the box. */
  tone: CheckboxTone;
};

/** Ready-to-use single checkbox field with label, description, and helper/error text. */
export function CheckboxField({
  label,
  description,
  hint,
  error,
  magnitude,
  tone,
  name,
  disabled,
  ...controlProps
}: CheckboxFieldProps) {
  return (
    <Field
      name={name}
      disabled={disabled}
      invalid={error != null || tone === "danger" || undefined}
    >
      <FieldItem disabled={disabled}>
        <CheckboxFieldControl tone={tone} disabled={disabled} {...controlProps} />
        <FieldItemContent magnitude={magnitude} description={description}>
          {label}
        </FieldItemContent>
      </FieldItem>
      <FieldHelperText magnitude={magnitude} hint={hint} error={error} />
    </Field>
  );
}
