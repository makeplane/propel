import type * as React from "react";

import { FieldItemControlGroup } from "../../elements/field/field-item-control-group";
import type { FieldMagnitude } from "../../elements/field/variants";
import { Checkbox, type CheckboxProps } from "../checkbox";
import { Field, FieldItem, FieldItemContent } from "../field";
import { FieldHelperText } from "../field/field-helper-text";

export type { FieldMagnitude } from "../../elements/field/variants";

/** Bare checkbox control props for a field row — no chip `label` / `icon` (Field owns labeling). */
type CheckboxFieldControlProps = Omit<CheckboxProps, "children" | "label" | "icon">;

export type CheckboxFieldProps = Omit<CheckboxFieldControlProps, "aria-label"> & {
  /** Helper text shown below the control. Replaced by `error` when an error is set. */
  hint?: React.ReactNode;
  /** Error text shown below the control. */
  error?: React.ReactNode;
  /** Visible field label. */
  label: string;
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
        <FieldItemControlGroup>
          <Checkbox disabled={disabled} {...controlProps} />
        </FieldItemControlGroup>
        <FieldItemContent magnitude={magnitude} description={description}>
          {label}
        </FieldItemContent>
      </FieldItem>
      <FieldHelperText magnitude={magnitude} hint={hint} error={error} />
    </Field>
  );
}
