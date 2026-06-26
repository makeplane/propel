import type * as React from "react";

import { Field } from "../../ui/field/field";
import { FieldItem } from "../../ui/field/field-item";
import { FieldItemContent } from "../../ui/field/field-item-content";
import type { FieldMagnitude } from "../../ui/field/variants";
import { FieldHelperText } from "../field/field-helper-text";
import { Switch, type SwitchMagnitude, type SwitchProps } from "../switch/index";

const switchFieldTextMagnitude = {
  sm: "md",
  md: "md",
  lg: "lg",
} satisfies Record<SwitchMagnitude, FieldMagnitude>;

export type SwitchFieldProps = Omit<SwitchProps, "aria-label"> & {
  /** Helper text shown below the control. Replaced by `error` when an error is set. */
  hint?: React.ReactNode;
  /** Error text shown below the control. */
  error?: React.ReactNode;
  /** Visible field label. */
  label: React.ReactNode;
  /** Optional supporting text announced as the switch description. */
  description?: React.ReactNode;
};

/** Ready-to-use switch field with label, description, and helper/error text. */
export function SwitchField({
  label,
  description,
  hint,
  error,
  magnitude,
  name,
  disabled,
  ...controlProps
}: SwitchFieldProps) {
  const textMagnitude = switchFieldTextMagnitude[magnitude];

  return (
    <Field name={name} disabled={disabled} invalid={error != null || undefined}>
      <FieldItem disabled={disabled}>
        <Switch magnitude={magnitude} disabled={disabled} {...controlProps} />
        <FieldItemContent magnitude={textMagnitude} description={description}>
          {label}
        </FieldItemContent>
      </FieldItem>
      <FieldHelperText magnitude={textMagnitude} hint={hint} error={error} />
    </Field>
  );
}
